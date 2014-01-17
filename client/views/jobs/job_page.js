/**
 * @author Exertis Micro-P
 */
Template.jobPage.helpers({
  getSkills: function(input) {
    var skillsArray = [];
    skillsArray = input[0].split(',');
    return skillsArray;
  }
})