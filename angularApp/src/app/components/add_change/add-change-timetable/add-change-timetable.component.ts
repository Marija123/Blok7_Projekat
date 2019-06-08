import { Component, OnInit } from '@angular/core';
import { LineServiceService } from 'src/app/services/lineService/line-service.service';
import { TimetableService } from 'src/app/services/timetableService/timetable.service';
import { TimetableModel } from 'src/app/models/timetableModel';
import { DayTypeModel } from 'src/app/models/dayTypeModel';

@Component({
  selector: 'app-add-change-timetable',
  templateUrl: './add-change-timetable.component.html',
  styleUrls: ['./add-change-timetable.component.css']
})
export class AddChangeTimetableComponent implements OnInit {
selected: string = "";
selectedDay: boolean = false;
allLines: any = [];
allDayTypes: any = [];
allTimetables: any = [];
showList: any = [];
dt: any;
br: number = 0;
dayTypeChosen : number;
lineIdChoosen: number;
boolic: boolean = false;
stringovi: string[] = [];
stringovi1: string[] = [];
depart: string = "";
ttZaDodavanje : TimetableModel = new TimetableModel("", 0, 0,0);
  constructor(private lineServ: LineServiceService, private timetableServ: TimetableService) { 
    this.lineServ.getAllLines().subscribe(data => {
      this.allLines = data;
      console.log(data);
    });

    this.timetableServ.getAllDayTypes().subscribe(data => {
      this.allDayTypes = data;
      console.log(data);
    });
    this.timetableServ.getAllTimetables().subscribe(data => {
      this.allTimetables = data;
      console.log(data);
    });


  }

  ngOnInit() {
  }


  setradio(e: string): void   
  {  
        this.selected = e;  
       
  }  
   


  isSelected(name: string): boolean   
  {  
        if (!this.selected) { 
            return false;  
        }  
        return (this.selected === name); 
  } 

  SelectedDaytype(event: any)
  {
    this.dt = event.target.value;
    console.log(this.dt);
    if(this.dt == 0){
      console.log("none selektovan")
      this.selectedDay = false;
    }else{
      console.log("Udje")
      this.selectedDay = true;
      this.getLineIds();
    }
  }
  
getLineIds(){
  let list: any = [];
  let k: any;
  let ll: any =[];
  if(this.allTimetables === void 0){
   console.log("udje u kad nema elemenata u timetables");
    ll = this.allTimetables.find(u =>{
      u.DayTypeId == this.dt;
    });
    this.allLines.forEach(element => {
      
      k = ll.find(g =>{
        g.LineId == element.Id;
      });
  
     if(k==null) {
        this.showList.push(element);
     }
    });
  }
  else{
    this.showList = this.allLines;
  }
  
}

SelectedLine(event: any): void
{
  this.lineIdChoosen = event.target.value;
  if(event.target.value != 0){
    this.boolic = true;
  }
  
}
addTime(n:any){
 
  console.log(n);
  this.stringovi.push(n);
  this.stringovi.sort((a,b)=> a.localeCompare(b));
  this.stringovi1 = this.stringovi;
}
AddTimetable(){
  this.ttZaDodavanje.DayTypeId = this.dt;
  this.ttZaDodavanje.LineId = this.lineIdChoosen;
  let stringZaDodavanje : string = "";
  this.stringovi1.forEach(x => {
    stringZaDodavanje = stringZaDodavanje + x + ";";
  });
  this.ttZaDodavanje.Departures = stringZaDodavanje;
  this.timetableServ.addTimetable(this.ttZaDodavanje).subscribe();

}
removeFromTimes(st,i){
  this.stringovi1.splice(i,1);
  this.stringovi = this.stringovi1;
  
}

}
