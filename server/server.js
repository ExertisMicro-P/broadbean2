/**
 * @author Exertis Micro-P
 */
Meteor.publish('jobs', function(options) {
  return Jobs.find({}, options); 
});


Meteor.publish('alljobs', function() {
  return Jobs.find({}, {sort: {job_title: 1}}); 
});

Meteor.publish('singleJob', function(id) { 
	return id && Jobs.find(id);
});