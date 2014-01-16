/**
 * @author Exertis Micro-P
 */

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('jobs'); }
});

Router.map(function () {
 
 	this.route('jobsList', {path: '/'});

 	this.route('jobPage', {
			    path: '/jobs/:_id',
			    data: function() { return Jobs.findOne(this.params._id); }
	});
  });