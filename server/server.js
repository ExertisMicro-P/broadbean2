/**
 * @author Exertis Micro-P
 */
Meteor.publish('jobs', function(options) {
  return Jobs.find({}, options); 
});

Meteor.publish('singleJob', function(id) { 
	return id && Jobs.find(id);
});