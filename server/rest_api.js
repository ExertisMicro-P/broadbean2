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

	return Jobs.findOne({
		_id : this.params.id
	});
});

RESTstop.add('jobs', {
	method : 'GET',
	require_login : false
}, function() {
	console.log('API:jobs');

	var storedjobs = new Array;
	Jobs.find({}).forEach(function(job) {

		// Modify the post here...
		console.log('API jobs GET: ' + job.job_title + '(' + storedjobs.length + ')');

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

	if (!isJsonString(this.params.xmljob)) {
		// not JSON passed in so assume it's XML

		restFuture = new Future();
		xml2js.parseStringSync(this.params.xmljob, handleData);
		return restFuture.wait();
	} else {
		// looks like JSON was passed
		handleData(null,eval(this.params.xmljob)); // !! UNSAFE !!
	}
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

	result = data;
	cmd = result.job.command[0];
	console.dir(result);
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
			Jobs.remove({
				application_email : result.application_email
			}, removeCallback);
			return deleteFuture.wait();
			break;

		default:
			console.log('DEF:COMMAND=' + cmd + '.');
	} // switch

}// handleData

function IsJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}