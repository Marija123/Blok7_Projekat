import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/userService/user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserProfileService]
})
export class ProfileComponent implements OnInit {
 
  user: any;
  constructor(private usersService: UserProfileService) {
    this.requestUserInfo()
   }

  ngOnInit() {
  }

  requestUserInfo(){
    this.usersService.getUserClaims().subscribe(claims => {
      this.usersService.getUserData(claims['Email']).subscribe(data => {
        
          this.user = data;        
        })
     
      })
  }

}
