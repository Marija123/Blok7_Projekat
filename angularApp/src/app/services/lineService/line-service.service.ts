import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineServiceService {

  base_url = "http://localhost:52295"
  constructor(private http: Http, private httpClient:HttpClient) { }

  addLine(line): Observable<any>{
    
    return this.httpClient.post(this.base_url+"/api/Lines/Add",line);
  }
}
