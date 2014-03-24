/**
 * @author Exertis Micro-P
 */
Template.jobPage.helpers({
  getSkills: function(input) {
    // handle legacy Jobs
    if (Array.isArray(input))
      input = input[0];
    
    if (typeof input != 'undefined') {
      var skillsArray = [];
      skillsArray = input.split(',');
      console.log(skillsArray);
      return skillsArray;
    } else
      return '';
  }, // getSkills
  
  job_description_html: function() {
    var desc;
        if (Array.isArray(this.job_description))
          desc = this.job_description[0];
        else 
          desc = this.job_description;
    
    console.log(desc);
   if (typeof desc !== 'undefined')
      return marked(desc);
    else
      return  '';
  } // job_description_html
})

Template.jobPage.events({
  'click .delete': function(e) {
             e.preventDefault();
             if (confirm("Delete this Job?")) {
               var currentJobId = this._id;
               Jobs.remove(currentJobId, function(error) {
                if (!error) {
                   Alerts.add('Job '+this.job_title+' / '.currentJobId+' DELETED!', 'warning', {
                                  fadeIn: 1000, fadeOut: 1000, autoHide: 10000
                   });
                 } else {
                   Alerts.add('FAILED!!: Job '+this.job_title+' / '.currentJobId+' NOT deleted!', 'danger', {
                                  fadeIn: 1000, fadeOut: 1000, autoHide: 10000
                   });
                 }
                 Router.go('jobsList');
               }); // remove + callback
             }
   } // delete
});