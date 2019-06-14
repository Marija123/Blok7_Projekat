import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { RegModel } from 'src/app/models/regModel';
import { NgForm } from '@angular/forms';
import { TypeModel } from 'src/app/models/typeModel';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { RegistrationValidations } from 'src/app/models/Validation/validationModels';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validations: RegistrationValidations = new RegistrationValidations();
  private selected: string=""; 
  types:any = [];
  selectedImage: any;
 
  userBytesImage: any;
  constructor(private authService: AuthenticationService, private fileUploadService: FileUploadService, private notificationServ: NotificationService) {
    authService.getTypes().subscribe(types => {
      this.types = types;
    });
   }

  ngOnInit() {
  }

  Button1(regData: RegModel, form: NgForm){
    if (this.selectedImage == undefined){
      if(this.validations.validate(regData)) return;
    console.log(regData);
      this.authService.register(regData).subscribe(data =>{
        if(regData.Role != 'AppUser'){
        this.notificationServ.sendNotification();
        }
        window.location.href="/signin";
       });
        }else{
          this.fileUploadService.uploadFile(this.selectedImage)
          .subscribe(data => {  
            if(this.validations.validate(regData)) return;
            console.log(regData);
            this.authService.register(regData).subscribe(data =>{
              if(regData.Role != 'AppUser'){
                this.notificationServ.sendNotification();
              }
                if(regData.Role == 'AppUser')
                {
                  this.notificationServ.sendNotificationToController();
                }
                window.location.href="/signin";
            });
          });
        }
       
  }

    setradio(e: string): void   
  {    
    this.selected = e;  
  }  

  isSelected(name: string): boolean   
  { 
    if (!this.selected) { // if no radio button is selected, always return false so every nothing is shown  
      return false;  
    }  
    return (this.selected === name); // if current radio button is selected, return true, else return false  
  }   

    onFileSelected(event){
      this.selectedImage = event.target.files;
     
    }
  

}
