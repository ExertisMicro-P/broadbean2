/**
 * @author Exertis Micro-P
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
  org_job_title = result.job.job_title;
  
  for (var i = 0; i < 100; i++) {
  	time = now - i * 3600 * 1000;
  	result.job.job_title = org_job_title + ' ' + time;
  	Jobs.insert(result.job);
  }
  
}