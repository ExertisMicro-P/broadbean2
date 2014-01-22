/**
 * @author Exertis Micro-P
 */
console.log('Configuring REST API - rest_api.js');

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

	var jobs = [];
	Jobs.find().forEach(function(job) {

		// Modify the post here...

		jobs.push({
			'job' : job
		});
	});
	return jobs;
});

RESTstop.add('job', {
	method : 'POST',
	require_login : false
}, function() {
	// this will take XML ad=nd add it to the Jobs collection});
	var result = xml2js.parseStringSync(this.params.xmljob);
	console.dir(result);
	switch(result.command) {
		case 'add':
			Jobs.insert(result.job, function(error, _id) {
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

				return [code, {
					success : success,
					message : msg
				}];
			});
			break;

		case 'delete':
			Jobs.remove({
				application_email : result.application_email
			}, function(error, _id) {
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

				return [code, {
					success : success,
					message : msg
				}];
			});
			break;
	} // switch
});
