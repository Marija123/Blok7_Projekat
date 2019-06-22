import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  prom: string;
  // message: any = {};
  // subscription: Subscription;
  
  constructor(private notServ:NotificationService, public authService: AuthenticationService, private router: Router) {  
     //this.subscription = this.notServ.getMessage().subscribe(message => { this.message = message; });
    }

  ngOnInit() {
    
  }

  loggedIn():string{
    if(localStorage.jwt){
      this.prom = localStorage.getItem('name');
    }
    return localStorage.jwt;
  }

  logout() {
    this.authService.logout();
     // window.location.href = "/home";
      this.router.navigate(["signin"]);
    
    
  }
  get user(): any {
    return localStorage.getItem('role');
}

// ngOnDestroy() {
//   // unsubscribe to ensure no memory leaks
//   this.subscription.unsubscribe();
// }
}
