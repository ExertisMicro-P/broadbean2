/**
 * @author Exertis Micro-P
 */
Jobs = new Meteor.Collection('jobs',
        {
    schema: {
        command: {
            type: String,
            label: "Command",
            max: 20
        },
        username: {
            type: String,
            label: "Username"
        },
        password: {
            type: String,
            label: "Password",
            min: 3
        },
        contact_name: {
            type: String,
            label: "Contact Name",
            optional: true
        },
        contact_email: {
            type: String,
            label: "Contact Email",
            optional: true,
            max: 1000
        },
        contact_telephone: {
            type: String,
            label: "Contact Telephone",
            optional: true,
            max: 1000
        },
        contact_url: {
            type: String,
            label: "Contact URL",
            optional: true,
            max: 1000
        },
        days_to_advertise: {
            type: Number,
            label: "Days to advertise",            
            max: 365,
            min: 1
        },
        application_email: {
            type: String,
            label: "Application Email",
            max: 1000
        },
        job_reference: {
            type: String,
            label: "Job Reference",
            max: 32
        },
        job_title: {
            type: String,
            label: "Job Title",
            max: 100
        },
        job_type: {
            type: String,
            label: "Job Type",
            allowedValues: ['Contract','Permanent','Temp']
        },
        job_duration: {
            type: String,
            label: "Job Duration",
            optional: true,
            max: 100
        },
        job_startdate: {
            type: String,
            label: "Job Start Date",
            optional: true,
            max: 100
        },
        job_skills: {
            type: String,
            label: "Skills",
            optional: true
        },
        job_description: {
            type: String,
            label: "Job Description",
            optional: false,
            max: 5000
        },
        job_location: {
            type: String,
            label: "Job Location",
            allowedValues: ['Altham', 'Stoke', 'Basingstoke', 'Elland', 'Dordrecht','Diege','Dublin']
        },
        job_industry: {
            type: String,
            label: "Department",
            optional: false,
            max: 32
        },
        salary_currency: {
            type: String,
            label: "Salary Current",
            allowedValues: ['gbp', 'usd', 'eur','GBP','USD','EUR']
        },
        salary_from: {
            type: String,
            label: "Salary From",
            optional: true,
            max: 32
        },
        salary_to: {
            type: String,
            label: "Salary To",
            optional: true,
            max: 32
        },
        salary_per: {
            type: String,
            label: "Salary Per",
            allowedValues: ['hour', 'day', 'week', 'month', 'annum']
        },
        salary_benefits: {
            type: String,
            label: "Benefits",
            optional: true,
            max: 1000
        },
        salary: {
            type: String,
            label: "Salary (full text)",
            optional: true,
            max: 100
        },
        exertis_company: {
            type: String,
            label: "Exertis Company",
            allowedValues: ['Exertis Micro-P', 'Exertis Advent', 'Exertis GoConnect', 'Exertis Security', 'Exertis Gem', 'Exertis MSE']
        },
        featured: {
            type: String,
            label: "Is featured",
            optional: true,
        },
      
    }
}
                            
);



Jobs.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  },
  fetch: []
});