/**
 * @author Exertis Micro-P
 */



Template.jobsList.helpers({
  /*jobs: function() {
    return Jobs.find({job_title: {$regex: Session.get('searchfor'), $options: 'i' }});
  }*/
 hasMoreJobs: function(){
    this.jobs.rewind();
    //return Router.current().limit() == this.jobs.fetch().length;
    return Router.current().limit() == Session.get('numJobs');
 },
  
  areJobs: function(){
    return this.jobs.fetch().length > 0;
  },
  
  numJobs: function(){
    //return this.alljobs.fetch().length;
   return Session.get('numJobs');
  },

  numMatchingJobs: function(){
    //return Jobs.find({job_title: {$regex: Session.get('searchfor'), $options: 'i' }}).count();
     return Session.get('numMatchingJobs');
  }
});

Template.jobsList.events({
  'keyup #searchfor': function() {
  	if ($('#searchfor').val().length>2)
    	Session.set('searchfor', $('#searchfor').val());
    else if ($('#searchfor').val().length==0)
    	Session.set('searchfor', '.+'); 
    
    //$('#searchfor').focus();
  }
});


Deps.autorun(function() {
   Meteor.call('getNumJobs', function(err,result) {
      if (!err) {
        console.log('numJobs = '+result);
        Session.set('numJobs', result);
      } else
        console.log('getNumJobs:'+err);
    });
});

Deps.autorun(function() {
 
  searchfor = (Session.get('searchfor')=='' || Session.get('searchfor')==null) ? '.+' : Session.get('searchfor');
  
   Meteor.call('getNumMatchingJobs', searchfor, function(err,result) {
      if (!err) {
        console.log('numMatchingJobs = '+result);
        Session.set('numMatchingJobs', result);
      } else
        console.log('getNumMatchingJobs:'+err);
    });
});



Meteor.startup( function() {
  Session.set('searchfor','.+');
});


