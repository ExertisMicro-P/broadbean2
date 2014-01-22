/**
 * @author Exertis Micro-P
 */

Router.configure({
	layoutTemplate : 'layout',
	loadingTemplate : 'loading',
	waitOn : function() {/* return Meteor.subscribe('jobs'); */
	}
});

JobsListController = RouteController.extend({
	template : 'jobsList',
	increment : 5,
	limit : function() {
		return parseInt(this.params.jobsLimit) || this.increment;
	},
	findOptions : function() {
		return {
			sort : {
				job_title : 1
			},
			limit : this.limit()
		};
	},
	waitOn : function() {
		return Meteor.subscribe('jobs', this.findOptions());
	},
	data : function() {
		return {
			jobs : Jobs.find({job_title: {$regex: Session.get('searchfor'), $options: 'i' }}, this.findOptions()),
			nextPath : this.route.path({
				jobsLimit : this.limit() + this.increment
			})
		};
	}
});

Router.map(function() {

	this.route('jobsList', {
		path : '/:jobsLimit?',
		controller : JobsListController
	});

	this.route('jobPage', {
		path : '/jobs/:_id',
		waitOn : function() {
			return [Meteor.subscribe('singleJob', this.params._id)];
		},
		data : function() {
			return Jobs.findOne(this.params._id);
		}
	});
}); 