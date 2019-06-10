import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { RegModel } from 'src/app/models/regModel';
import { NgForm } from '@angular/forms';
import { TypeModel } from 'src/app/models/typeModel';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private selected: string=""; 
  types:any = [];
  selectedImage: any;
  selIm: string  = "C:/Users/Barbara/Pictures/Screenshots/Untitled.jpg";
  userBytesImage: any;
  constructor(private authService: AuthenticationService, private fileUploadService: FileUploadService) {
    authService.getTypes().subscribe(types => {
      this.types = types;
    });
   }

  ngOnInit() {
  }

  Button1(regData: RegModel, form: NgForm){
    if (this.selectedImage == undefined){
           alert("No image selected!");
          return; 
        }
        this.fileUploadService.uploadFile(this.selectedImage)
       .subscribe(data => {      
         //alert("Image uploaded.");  
         this.authService.register(regData).subscribe();
        }
       )
    //this.authService.register(regData).subscribe();
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
  
    // onUpload(){    
    //   if (this.selectedImage == undefined){
    //     alert("No image selected!");
    //     return; 
    //   }
    //   this.fileUploadService.uploadFile(this.selectedImage)
    //   .subscribe(data => {      
    //     alert("Image uploaded.");  
    //   }, 
    //   error => {
    //     alert("Image not added, too large!");  
    //   })
    // }
}
