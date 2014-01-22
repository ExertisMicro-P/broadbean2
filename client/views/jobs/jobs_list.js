/**
 * @author Exertis Micro-P
 */
Template.jobsList.helpers({
  /*jobs: function() {
    return Jobs.find({job_title: {$regex: Session.get('searchfor'), $options: 'i' }});
  }*/
 hasMoreJobs: function(){
    this.jobs.rewind();
    return Router.current().limit() == this.jobs.fetch().length;
 },
  
  numJobs: function(){
    return this.jobs.fetch().length > 0;
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