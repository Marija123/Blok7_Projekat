import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StationModel } from 'src/app/models/stationModel';

@Injectable({
  providedIn: 'root'
})
export class StationServiceService {
  base_url = "http://localhost:52295"
  constructor(private http: Http, private httpClient:HttpClient) { }

  addStation(station): Observable<any>{
    
    return this.httpClient.post(this.base_url+"/api/Stations/Add",station);
  }
  changeStation(station): Observable<any>{
    
    return this.httpClient.post(this.base_url+"/api/Stations/Change",station);
  }

  deleteStation(id){
    
    return this.httpClient.delete(this.base_url+"/api/Stations/Delete?id=" + id);
  }

  getAllStations() {
    return this.httpClient.get(this.base_url+"/api/Stations/GetStations");
  }

}
