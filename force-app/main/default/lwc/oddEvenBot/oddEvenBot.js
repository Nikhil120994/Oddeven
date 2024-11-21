import { track } from 'lwc';
import BaseChatMessage from 'lightningsnapin/baseChatMessage'; 
import saveDetails from '@salesforce/apex/ServiceController.saveDetails';
import saveJobs from '@salesforce/apex/JobController.saveJobs';
export default class OddEvenBot extends BaseChatMessage  {
    @track fullName = '';
    @track email = '';
    @track mobileNumber = '';
    @track pincode = '';
    @track showForm=false;
    @track content ='';
    @track fullName='';
    @track email='';
    @track phone='';
    @track pin='';
    @track position='';
    @track showJob=false;
    @track resumeFile = '';
    @track resumeBase64 = '';
    @track menuOption=false;

    



    connectedCallback()
    {
        
        if (this.messageContent.value.startsWith('Mobile:')) {
                
            this.showForm=true;
            this.showJob=false;
            
        }
        else if (this.messageContent.value.startsWith('Position:')) {
                
            this.showJob=true;
            this.showForm=false;
            
        }
        else
        {
            this.content = this.messageContent.value;
        }
    }



    handleNameChange(event) {
        this.fullName = event.target.value;
    }
    
    handleEmailChange(event) {
        this.email = event.target.value;
    }
    
    handlePhoneChange(event) {
        this.phone = event.target.value;
    }
    
    handlePinChange(event) {
        this.pin = event.target.value;
    }
    handlePositionChange(event) {
        this.position = event.target.value;
    }
   
    handleFileChange(event) {
        const file = event.target.files[0];
        this.resumeFile = file;
       // this.convertFileToBase64();
    }

    /*convertFileToBase64() {
        if (!this.resumeFile) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            this.resumeBase64 = base64;
        };
        reader.readAsDataURL(this.resumeFile);
    }*/

    handleSubmit() {
        
        saveDetails({ 
            fullName: this.fullName, 
            email: this.email, 
            phone: this.phone ,
            pin:this.pin
        })
        .then(() => {
            this.showForm = false;
            this.content = 'Form submitted successfully!';
            this.menuOption=true;
        })
        .catch(error => {
            this.content = 'Error in form submission. Please try again later.';
        });
    } 

    handleJobSubmit() {
     

        saveJobs({ 
            fullName: this.fullName, 
            email: this.email, 
            phone: this.phone ,
            pin:this.pin,
            position:this.position,
            resumeBase64:this.resumeBase64
            
           
        })
            .then(() => {
                this.showJob = false;
                this.content = 'Form submitted successfully!';
                this.menuOption=true;
            })
            .catch(error => {
                alert('ERROR: '+error.body.message);
                this.content = 'Error in form submission. Please try again later.';
            });
    }
    }
        
   




