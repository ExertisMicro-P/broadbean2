/**
 * @author Exertis Micro-P
 */
Meteor.publish('jobs', function() {
  return Jobs.find({}); 
});