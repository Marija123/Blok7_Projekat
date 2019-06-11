import { Component, OnInit } from '@angular/core';
import { VerificationService } from 'src/app/services/verificationSerfice/verification.service';
import { UserProfileService } from 'src/app/services/userService/user-profile.service';
import { ModelHelperAuthorization } from 'src/app/models/modelHelperAuthorization';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
 user: any;
  awaitingAdmins:any = [];
  awaitingControllers:any = [];
  modelHelp: ModelHelperAuthorization = new ModelHelperAuthorization("");
  awaitingClients:any = [];
  
  userBytesImages:any = [];
  imagesLoaded:boolean = false
  wtfList:any = []
  constructor(private verifyService: VerificationService,private usersService: UserProfileService) { 
    this.usersService.getUserData(localStorage.getItem('name')).subscribe(data => {
         
      this.user = data;    
      console.log(this.user);    

      verifyService.getAwaitingAdmins().subscribe(data => {
        this.awaitingAdmins = data;
        verifyService.getAwaitingControllers().subscribe(data => {
          this.awaitingControllers = data;
        });
      })
  
      

    });
   
  
    
  }

  ngOnInit() {
  }

  
      

  AuthorizeAdmins(id, i) {
    this.modelHelp.Id = id;
    this.verifyService.authorizeAdmin(this.modelHelp).subscribe(resp => {
      if(resp == "Ok")  {
        alert("Admin has been authorized!");
        this.awaitingAdmins.splice(i,1);
      }

      else alert("Something went wrong");
    })
  }
  AuthorizeControllers(id, i) {
    this.modelHelp.Id = id;
    this.verifyService.authorizeController(this.modelHelp).subscribe(resp => {
      if(resp == "Ok")  {
        alert("Controller has been authorized!");
        this.awaitingControllers.splice(i,1);
      }

      else alert("Something went wrong");
    })
  }
 

  
}
