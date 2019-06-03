import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { RegModel } from 'src/app/models/regModel';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [AuthenticationService]
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  onSignIn(loginData: RegModel, form:NgForm){
    this.authService.signIn(loginData).subscribe(
      res => {
        console.log(res.access_token);

        let jwt = res.access_token;
        let jwtData = jwt.split('.')[1]
        let decodedJwtJasonData = window.atob(jwtData)
        let decodetJwtData = JSON.parse(decodedJwtJasonData)

        let role = decodetJwtData.role

        console.log('jwtData: ' + jwtData)
        console.log('decodedJwtJsonData: ' + decodedJwtJasonData)
        console.log(decodetJwtData)
        console.log('Role: ' + role)

        localStorage.setItem('jwt', jwt)
        localStorage.setItem('role', role)
        window.location.href = "/pricelist"
      }
    );
    
  }

}
