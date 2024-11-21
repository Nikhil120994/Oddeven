public with sharing class ServiceController {
    @AuraEnabled
    public static void saveDetails(String fullName, String email, String phone, String pin) {
        Our_Services__c service = new Our_Services__c();
        service.Name = fullName;
        service.Email_Address__c = email;
        service.Mobile_Number__c = phone;
        service.Pincode__c = pin;
        
        insert service;
    }
}
