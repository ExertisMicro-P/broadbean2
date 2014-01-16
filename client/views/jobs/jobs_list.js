/**
 * @author Exertis Micro-P
 */
Template.jobsList.helpers({
  jobs: function() {
    return Jobs.find();
  }
});