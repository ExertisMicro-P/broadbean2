/**
 * @author Exertis Micro-P
 */
Template.jobPage.helpers({
  getSkills: function(input) {
    var skillsArray = [];
    skillsArray = input[0].split(',');
    console.log(skillsArray);
    return skillsArray;
  },
  
  job_description_html: function() {
    console.log(this.job_description);
   if (typeof this.job_description[0] !== 'undefined')
      return marked(this.job_description[0]);
    else
      return  '';
  }
})