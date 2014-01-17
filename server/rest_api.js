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
	var id = Jobs.insert(result.job);
	return [200, {success: true, message: 'Job '+id+' was added'}];
});
