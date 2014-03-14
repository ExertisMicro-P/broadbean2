/**
 * @author Exertis Micro-P
 */

function randomJobTitle() {
  var jobtitles = ['Sales Manager','PHP Web Devleoper','Account Manager','Warehouse Operative','Sales Administrator'];
  var rand = jobtitles[Math.floor(Math.random() * jobtitles.length)];
  return rand;
}

function randomLocation() {
  var locations = ['Altham','Stoke','Basingstoke'];
  var rand = locations[Math.floor(Math.random() * locations.length)];
  return rand;
}

/*
Grab this data for testing via POST to http://broadbean.meteor.com/api/job
if you want to test posting a new job.
Set header = Content-Type : application/x-www-form-urlencoded

<job>
    <command>add</command>
    <username>broadbean2014</username>
    <password>Ragbax94</password>
    <contact_name>Bob Smith</contact_name>
    <contact_email>bob@smith.com</contact_email>
    <contact_telephone>020 7987 6900</contact_telephone>
    <contact_url>www.smith.com</contact_url>
    <days_to_advertise>7</days_to_advertise>
    <application_email>bob.12345.123@smith.aplitrak.com</application_email>
    <application_url>http://www.url.com/ad.asp?adid=12345123</application_url>
    <job_reference>abc123</job_reference>
    <job_title>Test Engineer</job_title>
    <job_type>Contract</job_type>
    <job_duration>6 Months</job_duration>
    <job_startdate>ASAP</job_startdate>
    <job_skills>VB, C++, PERL, Java</job_skills>
    <job_description>This is the detailed description</job_description>
    <job_location>London</job_location>
    <job_industry>Marketing</job_industry>
    <salary_currency>gbp</salary_currency>
    <salary_from>25000</salary_from>
    <salary_to>30000</salary_to>
    <salary_per>annum</salary_per>
    <salary_benefits>Bonus and Pension</salary_benefits>
    <salary>£25000 - £30000 per annum + Bonus and Pension</salary>
    <exertis_company>Exertis Micro-P</exertis_company>
    <featured>true</featured>
</job>

*/



xmljob = "<job>\
    <command>add</command>\
    <username>bobsmith</username>\
    <password>p455w0rd</password>\
    <contact_name>Bob Smith</contact_name>\
    <contact_email>bob@smith.com</contact_email>\
    <contact_telephone>020 7987 6900</contact_telephone>\
    <contact_url>www.smith.com</contact_url>\
    <days_to_advertise>7</days_to_advertise>\
    <application_email>bob.12345.123@smith.aplitrak.com</application_email>\
    <application_url>http://www.url.com/ad.asp?adid=12345123</application_url>\
    <job_reference>abc123</job_reference>\
    <job_title>Test Engineer</job_title>\
    <job_type>Contract</job_type>\
    <job_duration>6 Months</job_duration>\
    <job_startdate>ASAP</job_startdate>\
    <job_skills>VB, C++, PERL, Java</job_skills>\
    <job_description>This is the detailed description</job_description>\
    <job_location>London</job_location>\
    <job_industry>Marketing</job_industry >\
    <salary_currency>gbp</salary_currency>\
    <salary_from>25000</salary_from>\
    <salary_to>30000</salary_to>\
    <salary_per>annum</salary_per>\
    <salary_benefits>Bonus and Pension</salary_benefits>\
    <salary>£25000 - £30000 per annum + Bonus and Pension</salary>\
</job>";

if (Jobs.find().count() === 0) {
 
 	var now = new Date().getTime();
    
  //xml2js.options = {explicitArray: false};
  var result = xml2js.parseStringSync(xmljob);
  console.dir(result);
  //org_job_title = result.job.job_title;
  
  for (var i = 0; i < 23; i++) {
  	//time = now - i * 3600 * 1000;
  	//result.job.job_title = org_job_title + ' ' + time;
    result.job.job_title = randomJobTitle();
    result.job.job_location = randomLocation();
  	//Jobs.insert(result.job); // DON'T DO THIS WHEN LIVE
  }
  
}