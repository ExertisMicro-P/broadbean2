/**
 * @author Exertis Micro-P
 */

Session.set('searchfor','.+');

Template.jobsList.helpers({
  /*jobs: function() {
    return Jobs.find({job_title: {$regex: Session.get('searchfor'), $options: 'i' }});
  }*/
 hasMoreJobs: function(){
    this.jobs.rewind();
    return Router.current().limit() == this.jobs.fetch().length;
 },
  
  areJobs: function(){
    return this.jobs.fetch().length > 0;
  },
  
  numJobs: function(){
    return this.alljobs.fetch().length;
  },

  numMatchingJobs: function(){
    return Jobs.find({job_title: {$regex: Session.get('searchfor'), $options: 'i' }}).count();
  }
});

Template.jobsList.events({
  'keyup #searchfor': function() {
  	if ($('#searchfor').val().length>0)
    	Session.set('searchfor', $('#searchfor').val());
    else
    	Session.set('searchfor', ''); 
    
  }
});