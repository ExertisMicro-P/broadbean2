/**
 * @author Exertis Micro-P
 */
console.log('Configuring REST API - rest_api.js');

// Futures help is deal with returning things from callbacks
// They make async code synchronous.
// see http://www.discovermeteor.com/patterns/5828399
Future = Npm.require('fibers/future');

RESTstop.configure({
	use_auth : false
});




RESTstop.add('job/:id', {
	method : 'GET',
	require_login : false
}, function() {
  console.log('GET');
	job = Jobs.findOne({
		_id : this.params.id
	});
  
  if (typeof job !== 'undefined') {
    console.log('job=');console.log(job);
    if (typeof job.job_description[0] !== 'undefined') {
        job.job_description = marked(job.job_description[0]);
    }
    
    return job;
  } else {
    return [400, {
              success : false,
              message : 'Job '+this.params.id+' unknown'
            }]
  };
});



// id may be application_email or mongodb _id
RESTstop.add('job/:id', {
	method : 'DELETE',
	require_login : false
}, function() {
  
  console.log('DELETE');
  if (!this.params.id) {
    // don't know which to delete
    msg = "Required Parameter 'id' missing";
    console.log(msg);
     return ([400, {
        success : false,
        message : msg
      }]);
    
  } else {
    // try to find the job to delete
    console.log('Searching');
    restFuture = new Future();
    deleteJob(this.params.id);
    return restFuture.wait();    
  }
});




RESTstop.add('jobs', {
	method : 'GET',
	require_login : false
}, function() {
  
  console.log('GET api/jobs');
  this.response.setHeader('access-control-allow-origin', '*');
  
	console.log('API:jobs');

	var storedjobs = new Array;
	Jobs.find({}).forEach(function(job) {

		// Modify the post here...
		console.log('API jobs GET: ' + job.job_title + '(' + storedjobs.length + ')');
    
    // Convert Markdown job_description to HTML
    if (job.job_description) {
      job.job_description = marked(job.job_description.toString());      
    }

		storedjobs.push({
			'job' : job
		});
	});
	return {
		'jobs' : storedjobs
	};
});




RESTstop.add('job', {
	method : 'POST',
	require_login : false
}, function() {
	// this will take XML and add it to the Jobs collection});
  console.log('POST api/job');
  
  console.log('params=');console.log(this.params);
  
//  if (!this.params.xmljob) {
//     console.log('Required Parameter \'xmljob\' missing');
//      return ([400, {
//        success : false,
//        message : "Required Parameter 'xmljob' missing"
//      }]);
//  }

	if (!isJsonString(this.params)) {
		// not JSON passed in so assume it's XML
    console.log('Parsing XML');
    

		restFuture = new Future();
    //var someText = this.params.toString();//.replace(/(\r\n|\n|\r)/gm," ");
    //var j = JSON.parse(this.params.toString());
    var x = Object.keys(this.params)[0];
   console.log('x=');console.log(x);
		//xml2js.parseStringSync(x, handleData);
    
    xml2js.parseStringSync(x, {explicitArray:false}, handleData);
		return restFuture.wait();
	} else {
		// looks like JSON was passed
    console.log('Parsing JSON');
		handleData(null,eval(this.params)); // !! UNSAFE !!
  }
    console.log('Leaving: '+functionName());
});




function insertCallback(error, _id) {
  
	if (!error) {
		code = 200;
		success = true;
		msg = 'Job ' + _id + ' was inserted';
	} else {
		code = 400;
		success = false;
		msg = error;
	}

	console.log(msg);

	addFuture.
	return ([code, {
		success : success,
		message : msg
	}]);
}// insertCallback

function removeCallback(error, _id) {
	if (!error) {
		code = 200;
		success = true;
		msg = 'Job ' + _id + ' was removed';
	} else {
		code = 400;
		success = false;
		msg = error;
	}

	console.log(msg);

	deleteFuture.
	return ([code, {
		success : success,
		message : msg
	}]);
}

function handleData(err, data) {
  console.log('In handleData');

	result = data;
  console.log('result=');console.log(result);
  console.log('err=');console.log(err);
	cmd = result.job.command;
	console.dir(result);
  
  // verify credentials
  if (result.job.username == 'broadbean2014' && result.job.password == 'Ragbax94') {
  
    //console.log('SWITCH=' + cmd);
    switch(cmd) {
      case 'add':
        console.log('COMMAND=' + cmd);
        addFuture = new Future();
        Jobs.insert(result.job, insertCallback);
        restFuture.
        return (addFuture.wait());
        break;
  
      case 'delete':
        console.log('COMMAND=' + cmd);
        deleteFuture = new Future();
        deleteJob(id)
        return deleteFuture.wait();
        break;
  
      default:
        console.log('DEF:COMMAND=' + cmd + '.');
        console.log('Error: Unrecognised cmd!');
        restFuture.return([400, {
          success : false,
          message : 'Unrecognised cmd'
        }]);
        
    } // switch
  } else {
    // credentials were incorrect
    console.log('Error: Not Authtorised!');
    restFuture.return([403, {
      success : false,
      message : 'Not Authorised'
    }]);
  }

}// handleData

function isJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}


function functionName() 
{
   var myName = arguments.callee.toString();
   myName = myName.substr('function '.length);
   myName = myName.substr(0, myName.indexOf('('));

   return myName;
}



function deleteJob(id) {
   // search first for a job with matching application_email
    jobtodelete = Jobs.findOne({
      application_email : id
    });
    
    if (!jobtodelete) {
      // wasn't found. try searching again using id as _id
      jobtodelete = Jobs.findOne({
        _id : id
      });
    }
      
    
    console.log('Searching complete');
  
    if (!jobtodelete) {
      // couldn't find a match
      msg="Job Not Found: "+id;
      console.log(msg);
       restFuture.return ([200, {
          success : false,
         message : msg
        }]);
    } else {
      // delete the job
      console.log('Deleting '+id+'('+jobtodelete._id+')');
      deleteFuture = new Future();
      Jobs.remove({
          _id : jobtodelete._id
        }, removeCallback);
      restFuture.
        return( deleteFuture.wait());      
    }
} // deleteJob