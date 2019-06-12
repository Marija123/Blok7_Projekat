import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  base_url = "http://localhost:52295"
  constructor(private http: Http, private httpClient:HttpClient) { }

  getAllVehicles() {
    return this.httpClient.get(this.base_url+"/api/Vehicles/GetVehicles");
  }
  
  addVehicle(vehicle): Observable<any>{
    
    return this.httpClient.post(this.base_url+"/api/Vehicles/Add",vehicle);
  }
  
  GetAllAvailableVehicles(): Observable<any>{
    return this.httpClient.get(this.base_url+"/api/Vehicles/GetAvailableVehicles");
  }
 
}
