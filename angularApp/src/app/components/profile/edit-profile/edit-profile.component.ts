import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/userService/user-profile.service';
import { RegisterComponent } from '../../register/register.component';
import { RegModel } from 'src/app/models/regModel';
import { NgForm } from '@angular/forms';
import { ChangePasswordModel } from 'src/app/models/changePassModel';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user : any;
  selectedImage: any;
  constructor(private usersService: UserProfileService, private fileServ: FileUploadService) 
  { 
    this.requestUserInfo()
  }

  ngOnInit() {
  }
  requestUserInfo(){
    //this.usersService.getUserClaims().subscribe(claims => {
      this.usersService.getUserData(localStorage.getItem('name')).subscribe(data => {
        
          this.user = data;    
          let str = this.user.Birthday;
          this.user.Birthday = str.split('T')[0];
          console.log(this.user);    
      });
     
   // });
  }

  Button1(userr: RegModel, form: NgForm)
  {
    userr.Id = this.user.Id;
    if(localStorage.getItem('name') != this.user.Email)
    {
       localStorage.setItem('name', this.user.Email);
     }
    if (this.selectedImage == undefined){
      this.usersService.edit(userr).subscribe();
      //data =>{
       // if(userr.Role != 'AppUser'){
       //this.notificationServ.sendNotification();
       // }
     //  });
        }else{
          this.fileServ.uploadFile(this.selectedImage)
          .subscribe(data => {      
            //alert("Image uploaded.");  
            this.usersService.edit(userr).subscribe();
            //(data =>{
             //if(regData.Role != 'AppUser'){
             //this.notificationServ.sendNotification();
            // }
            //});
          });
        }
   
  }
  Button2(pass: ChangePasswordModel, form:NgForm )
  {
    this.usersService.editPassword(pass).subscribe();
  }
  onFileSelected(event){
    this.selectedImage = event.target.files;
   
  }
}
