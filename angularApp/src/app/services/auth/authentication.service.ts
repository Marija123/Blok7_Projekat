import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = false;
base_url = "http://localhost:52295"
  constructor(private http: Http, private httpClient:HttpClient) { }

  register(user): Observable<any>{
    console.log(user);
    return this.httpClient.post(this.base_url+"/api/Account/Register",user);
  }

  signIn(loginData: any){
    let data = `username=${loginData.Email}&password=${loginData.Password}&grant_type=password`;
    let headers = new HttpHeaders();
    headers = headers.append( "Content-type","application/x-www-fore-urlencoded");

    if(!localStorage.jwt){
      this.isLoggedIn = true;
      console.log(this.isLoggedIn);
      return this.httpClient.post(this.base_url+"/oauth/token",data,{"headers":headers}) as Observable<any>
    }
    else{
     // window.location.href = "/home";
    }
  
    // let httpOptions = {
    //   headers: {
    //     "Content-type":"application/x-www-fore-urlencoded"
    //   }
    // }
    // this.http.post(this.base_url+"/oauth/token",data,httpOptions).subscribe(data => {
    //   localStorage.jwt = data.access_token;
    // });
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
  }

  // getVehicleTypes() : Observable<any> {
  //   return this.getVehicleTypes1();
  // }
  getTypes() {
    return this.httpClient.get(this.base_url+"/api/Types/GetTypes");
  }
}
