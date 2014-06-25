BroadbeanEmailler = {
  sendEmail: function (appendToSubject, body) {
    
    var email =  {
      to: 'russell.hutson@exertismicro-p.co.uk',
      from: 'broadbean.meteor.com@exertismicro-p.co.uk',
      replyTo: 'no-reply@exertismicro-p.co.uk',
      subject: "broadbean.meteor.com - change detected - " + appendToSubject,
      text: body
    };
    
    console.log('process.env.MAIL_URL =');console.log(process.env.MAIL_URL);
    
    //if (typeof process.env.ROOT_URL != 'undefined' && process.env.ROOT_URL!='http://localhost:3000/'){
    if (typeof process.env.MAIL_URL != 'undefined' && process.env.MAIL_URL!=''){
      //Email.send(email);
    } else {
      console.log('process.env.MAIL_URL is not set!');
      console.log(email);
    }
  }, // getStandardEmailTemplate

  setupObserversForEmail: function () {
            // watch for changes
            var query = Jobs.find({});
            var handle = query.observe({
              added: function (newJob) {
                var job = newJob;
                console.log('job=');console.log(job);
                console.log('Job '+job._id+' - '+job.job_reference+' - '+' Added');
                BroadbeanEmailler.sendEmail('Record Added', job);
              },
              
              changed: function(newJob, oldJob) {
                 var job = newJob;
                console.log('job=');console.log(job);
                console.log('Job '+job._id+' - '+job.job_reference+' - '+' Changed');
                BroadbeanEmailler.sendEmail('Record Changed', job);
              },
              
              removed: function (oldJob) {
                 var job = oldJob;
                console.log('job=');console.log(oldJob);
                console.log('Job '+job._id+' - '+job.job_reference+' - '+' Removed');
                BroadbeanEmailler.sendEmail('Record Removed', job);
              }
            });
          } // setupObserversForEmail
} // BroadbeanEmailler