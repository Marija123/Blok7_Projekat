import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/userService/user-profile.service';
import { RegisterComponent } from '../../register/register.component';
import { RegModel } from 'src/app/models/regModel';
import { NgForm } from '@angular/forms';
import { ChangePasswordModel } from 'src/app/models/changePassModel';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user : any;
  constructor(private usersService: UserProfileService) 
  { 
    this.requestUserInfo()
  }

  ngOnInit() {
  }
  requestUserInfo(){
    this.usersService.getUserClaims().subscribe(claims => {
      this.usersService.getUserData(claims['Email']).subscribe(data => {
        
          this.user = data;    
          let str = this.user.Birthday;
          this.user.Birthday = str.split('T')[0];
          console.log(this.user);    
      });
     
    });
  }

  Button1(userr: RegModel, form: NgForm)
  {
    userr.Id = this.user.Id;
    this.usersService.edit(userr).subscribe();
  }
  Button2(pass: ChangePasswordModel, form:NgForm )
  {
    this.usersService.editPassword(pass).subscribe();
  }

}
