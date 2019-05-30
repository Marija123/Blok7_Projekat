import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
base_url = "http://localhost:52295"
  constructor(private http: Http, private httpClient:HttpClient) { }

  register(user): Observable<any>{
    console.log(user);
    return this.httpClient.post(this.base_url+"/api/Account/Register",user);
  }

  signIn(loginData: any){
    let data = `username=${loginData.Email}&password=${loginData.password}&grand_type`;
    let headers = new HttpHeaders();
    headers = headers.append( "Content-type","application/x-www-fore-urlencoded");

    if(!localStorage.jwt){
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

}