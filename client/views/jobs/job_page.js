/**
 * @author Exertis Micro-P
 */
Template.jobPage.helpers({
  getSkills: function(input) {
    var skillsArray = [];
    skillsArray = input[0].split(',');
    return skillsArray;
  },
  
  job_description_html: function() {
    return marked(this.job_description);
  }
})