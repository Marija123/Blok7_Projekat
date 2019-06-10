import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  getUserClaims() {
    return this.httpClient.get('http://localhost:52295/api/Account/UserInfo')
  }
  getUserData(email:string) {
    return this.httpClient.get('http://localhost:52295/api/Account/GetUser?email='+email)
  }
  // getUserTypes(){
  //   return this.httpClient.get('http://localhost:52295/api/Account/UserTypes')
  // }
}