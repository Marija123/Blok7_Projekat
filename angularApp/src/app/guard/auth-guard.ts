import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    
    if(localStorage.role == 'Admin') {
      return true;
    }
    else {
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}