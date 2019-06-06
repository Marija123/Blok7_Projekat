import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LineModel } from 'src/app/models/lineModel';

@Injectable({
  providedIn: 'root'
})
export class LineServiceService {

  base_url = "http://localhost:52295"
  constructor(private http: Http, private httpClient:HttpClient) { }

  addLine(line): Observable<any>{
    
    return this.httpClient.post(this.base_url+"/api/Lines/Add",line);
  }

  getAllLines() {
    return this.httpClient.get(this.base_url+"/api/Lines/GetLines");
  }

  deleteLine(id){
    
    return this.httpClient.delete(this.base_url+"/api/Lines/Delete?id=" + id);
  }

  changeLine(id,line): Observable<any>{
    
    return this.httpClient.put(this.base_url+"/api/Lines/Change?id=" + id,line);
  }

}
