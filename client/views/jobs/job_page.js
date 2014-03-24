/**
 * @author Exertis Micro-P
 */
Template.jobPage.helpers({
  getSkills: function(input) {
    if (typeof input != 'undefined') {
      var skillsArray = [];
      skillsArray = input.split(',');
      console.log(skillsArray);
      return skillsArray;
    } else
      return '';
  }, // getSkills
  
  job_description_html: function() {
    console.log(this.job_description);
   if (typeof this.job_description !== 'undefined')
      return marked(this.job_description);
    else
      return  '';
  } // job_description_html
})