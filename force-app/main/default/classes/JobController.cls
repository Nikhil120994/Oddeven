public with sharing class JobController {
    @AuraEnabled
    public static void saveJobs(String fullName, String email, String phone, String pin,string position) {
        
       
    
            Jobs_Enquiry__c job = new Jobs_Enquiry__c();
            job.Name = fullName;
            job.Email_Address__c = email;
            job.Mobile_Number__c = phone;
            job.Pincode__c = pin;
            job.Position__c = position;
            insert job;

           
           
}
}