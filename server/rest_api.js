/**
 * Exposes an API to Broadeban 
 * as described in http://api.adcourier.com/docs/index.cgi?page=jobboards_overview 
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
  now = new Date();
  
	Jobs.find({}).forEach(function(job) {
    // Filter out any expired jobs
    skip = false;
    if (job.createdAt) {
      expiresAt = new Date(job.createdAt);
      expiresAt.setDate(expiresAt.getDate() + job.days_to_advertise); 
      if (now > expiresAt) {
        skip = true;
      }
    } else {
     /* 
     // frig to setup initial createdAt on some existing records
     Jobs.update(job._id,
                  {
                    $set: {days_to_advertise: 30}
                  }
                 );
                 */
    }
    
    if (skip) {
      console.log('API jobs GET: SKIPPED (Expired): ' + job.job_title + '(' + storedjobs.length + ')');
    } else {
      // Modify the post here...
      console.log('API jobs GET: ' + job.job_title + '(' + storedjobs.length + ')');

      // Convert Markdown job_description to HTML
      if (job.job_description) {
        job.job_description = marked(job.job_description.toString());      
      }

      storedjobs.push({
        'job' : job
      });
  } // if skip
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
    
    xx = x + this.params[x];
   console.log('xx=');console.log(xx);
		//xml2js.parseStringSync(x, handleData);
    
    // strip off <?xml version="1.0" encoding="utf-8"?>
    xx = xx.replace('<?xml version="1.0" encoding="utf-8"?>','');
    xx = xx.trim();      
    console.log('2)xx=');console.log(xx);
    
    xml2js.parseStringSync(xx, {explicitArray:false}, handleData);
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

function removeCallback(error, count) {
	if (!error) {
		code = 200;
		success = true;
		msg = count + ' Job was removed';
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
        console.log('id='+result.job.id);
        
         Email.send({
          to: 'russell.hutson@exertis.co.uk',
          from: 'russell.hutson@exertis.co.uk',
          subject: "Meteor Broadbean - Delete attempted",
          text: JSON.stringify(result)
        });
        
        // search first for a job with matching application_email
        jobtodelete = Jobs.findOne({
          _id : result.job.id
        });
        
        /*
        if (!jobtodelete) {
          // wasn't found. try searching again using id as _id
          jobtodelete = Jobs.findOne({
            _id : result.job.id
          });
        }
        */
      
        if (jobtodelete) {
          console.log('Searching complete. Found'+jobtodelete._id);          
          deleteFuture = new Future();          
          deleteJob(jobtodelete);
          return deleteFuture.wait();
        } else {
           console.log('Searching complete. NOT FOUND '+result.job.id);
           // couldn't find a match
            msg="Job Not Found: "+result.job.id;
            console.log(msg);
             restFuture.return ([200, {
                 success : false,
                 message : msg
              }]);
        }
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



function deleteJob(jobtodelete) {
   
  // delete the job
  console.log('Deleting ('+jobtodelete._id+')');
  deleteFuture = new Future();
  Jobs.remove({
    _id : jobtodelete._id
  }, removeCallback);
  restFuture.
  return( deleteFuture.wait());      
   
} // deleteJob