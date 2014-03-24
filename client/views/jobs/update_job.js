// updateJobAF = new AutoForm(Jobs);


Template.updateJob.jobsCollection = function () {
    return Jobs;
};

/*
Template.updateJob.updateJobAF = function () {
    return updateJobAF;
};

updateJobAF.hooks({
  onSuccess: function(operation, result, template) {
    Router.go('jobsList')
  }, 
});
*/


/**
 * Markdown editor2 support for Job Descriptions
 * see https://github.com/tchapi/pagedown-bootstrap/blob/master/demo/browser/demo.html for demo of using 2 editors on the same page
 */

if (typeof Template.editor2.created == 'undefined') {
  Template.editor2.created = function() {
      this.editor2 = false;
  };
  
  Template.editor2.rendered = function() {
      if (!this.editor2) {
          var converter = {
              makeHtml: function(text) { return marked(text); }
          };
  
          var editor2 = new Markdown.Editor(converter,'2');
          editor2.run();
          this.editor2 = true;
      }
     
      $('#edit-btn2').tooltip({placement: 'bottom'})
      $('#preview-btn2').tooltip({placement: 'bottom'})
      $('table').addClass('table table-striped table-bordered table-hover');
  }
  
  
  
  Template.editor2.events({
      'click a': function(e) {
          // always follow links
          e.stopPropagation();
      },
      'click #preview-btn2': function(e, t) {
          e.preventDefault();
          var description = $('#innereditor2').text();
          $('#wmd-input2').hide();
          $('#preview-btn2').hide();
          $('#wmd-preview2').show();
          $('#edit-btn2').show();
          $('table').addClass('table table-striped table-bordered table-hover');
      },
      'click #edit-btn2': function(e) {
          e.preventDefault();
          $('#wmd-preview2').hide();
          $('#edit-btn2').hide();
          $('#wmd-input2').show();
          $('#preview-btn2').show();
      },
  });
} else {
  console.log('update_job: not rendering Markdown Editor!');
}
