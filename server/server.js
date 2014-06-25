/**
 * @author Exertis Micro-P
 */
Meteor.publish('jobs', function(options) {
  return Jobs.find({}, options); 
});

/*
Meteor.publish('alljobs', function() {
  return Jobs.find({}, {sort: {job_title: 1}}); 
});
*/

Meteor.publish("alljobsplain", function() {
    return Jobs.find();
  });

Meteor.publish('singleJob', function(id) { 
	return id && Jobs.find(id);
});


Meteor.methods({
  getNumJobs: function () {
    num = Jobs.find({}).count();
    console.log('getNumJObs = '+num);
    return num;
  }, // getNumJobs

  getNumMatchingJobs: function (searchfor) {
    console.log('getNumMatchingJobs: searchfor = '+searchfor);

    searchregex = {$regex: searchfor, $options: 'i' };
    num = Jobs.find({ $or: [ { job_title: searchregex } ,
                     { job_description: searchregex } ] }).count();
    console.log('getNumMatchingJobs = '+num);
    return num;
  } // getNumMatchingJobs
});


Meteor.startup( function() {
  console.log(process.env);
  BroadbeanEmailler.setupObserversForEmail();
});