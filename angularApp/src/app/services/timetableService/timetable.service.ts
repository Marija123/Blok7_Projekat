import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { TimetableModel } from 'src/app/models/timetableModel';
import { DayTypeModel } from 'src/app/models/dayTypeModel';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  base_url = "http://localhost:52295"
  constructor(private http: Http, private httpClient:HttpClient) { }

  addTimetable(timetable): any{
    
    return this.httpClient.post(this.base_url+"/api/Timetables/Add",timetable);
  }

  

  getAllTimetables() {
    return this.httpClient.get(this.base_url+"/api/Timetables/GetTimetables");
  }

  getAllDayTypes() {
    return this.httpClient.get(this.base_url+"/api/DayTypes/GetDayTypes");
  }

  deleteTimetable(id){
    
    return this.httpClient.delete(this.base_url+"/api/Timetables/Delete?id=" + id);
  }

  changeTimetable(id,timetable): Observable<any>{
    
    return this.httpClient.put(this.base_url+"/api/Timetables/Change?id=" + id,timetable);
  }
}
