/**
 * @author Exertis Micro-P
 */

Router.configure({
	layoutTemplate : 'layout',
	loadingTemplate : 'loading',
	waitOn : function() {/* return Meteor.subscribe('jobs'); */
	}
});


// User must be logged in to do create
Router.before(
  function() {
    if (!Meteor.userId()) {
      // use http://beta.atmospherejs.com/package/bootstrap-alerts
      Alerts.add('Sorry, you need to login first', 'danger', {
                fadeIn: 1000, fadeOut: 1000, autoHide: 10000
            });
      this.redirect('jobsList');      
    } else {
      this.stop;
    }
}, {except: ['jobsList']});



JobsListController = RouteController.extend({
	template : 'jobsList',
	increment : 50,
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
		return Meteor.subscribe('jobs', this.findOptions()) //&& Meteor.subscribe('alljobs');
	},
  after : function() {
    //Session.set('searchfor','.+');
  },
	data : function() {
      searchfor = (Session.get('searchfor')=='' || Session.get('searchfor')==null) ? '.+' : Session.get('searchfor');
		return {
			jobs : Jobs.find({job_title: {$regex: searchfor, $options: 'i' }}, this.findOptions()),
			//alljobs : Jobs.find({}),
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
		path : '/jobs/job_page/:_id',
		waitOn : function() {
      //console.log('params=');console.log(this.params);
			return Meteor.subscribe('singleJob', this.params._id);
		},
		data : function() {
      console.log('params=');console.log(this.params);
			return Jobs.findOne(this.params._id);
		}
	});
  
  this.route('createJob', {
    path : '/job/create_job',
    waitOn : function() {
      return Meteor.subscribe('alljobsplain');
    },
    before: function() {
            if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
                Log('Redirecting');
                this.redirect('/');
            }
        }
	});
  
   this.route('updateJob', {
      path : '/job/update_job/:_id',
      waitOn : function() {
                    return Meteor.subscribe('alljobsplain');
                  },
     data: function() {
                    return Jobs.findOne(this.params._id);
                  },
     before: function() {
            if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
                Log('Redirecting');
                this.redirect('/');
            }
        }
	});
  
  this.route('admin', {
        path:'/admin',
        template: 'accountsAdmin',
        before: function() {
            if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
                Log('Redirecting');
                this.redirect('/');
            }
        }
    });
}); 