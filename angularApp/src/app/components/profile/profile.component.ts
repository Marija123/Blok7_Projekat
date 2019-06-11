import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/userService/user-profile.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserProfileService]
})
export class ProfileComponent implements OnInit {
 
  user: any;
  otvorenEdit: boolean = false;
  constructor(private usersService: UserProfileService, private router: Router, private route: ActivatedRoute) {
    this.requestUserInfo()
   }

  ngOnInit() {
  }

  requestUserInfo(){
   // this.usersService.getUserClaims().subscribe(claims => {
      this.usersService.getUserData(localStorage.getItem('name')).subscribe(data => {
        
          this.user = data;    
          console.log(this.user);    
        });
     
    //  });
  }

  Edit(){
    this.otvorenEdit = true;
    this.router.navigate(['../profile/edit'], {relativeTo: this.route});
  }

}
