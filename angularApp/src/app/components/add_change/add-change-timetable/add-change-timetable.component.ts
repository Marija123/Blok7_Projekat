import { Component, OnInit } from '@angular/core';
import { LineServiceService } from 'src/app/services/lineService/line-service.service';
import { TimetableService } from 'src/app/services/timetableService/timetable.service';
import { TimetableModel } from 'src/app/models/timetableModel';
import { DayTypeModel } from 'src/app/models/dayTypeModel';
import { VehicleModel } from 'src/app/models/vehicleModel';
import { VehicleService } from 'src/app/services/vehicleService/vehicle.service';


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
duzinaStringovi: boolean = false;
stringovi: string[]  = [];
stringovi1: string[] = [];
depart: string = "";
vehicleId: any;
availableVehicles: any = [];
chooseVehicle: boolean = false;
ttZaDodavanje : TimetableModel = new TimetableModel("", 0, 0,0);
  constructor(private lineServ: LineServiceService, private timetableServ: TimetableService,private vehicleServ: VehicleService) { 
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
        this.boolic = false;
        this.selectedDay = false;
       
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
      this.selectedDay = false;
    }else{
      this.selectedDay = true;
      if(this.selected == "Add")
      {
        this.getLineIds();
      }
      if(this.selected == "Change")
      {
        this.getLineIdsForChange();
      }
     
    }
  }

getLineIdsForChange()
{
  let ll: any =[];
  let k : boolean = false;
  this.showList = [];
  if(this.allTimetables === void 0){

    this.showList = [];
  }
  else{
   
    this.allTimetables.forEach(element => {
     
      if(element.DayTypeId == this.dt)
      {
        ll.push(element);
      }
    });

    if(ll === void 0 || ll == [])
    {
      this.showList = [];
    }
    else {
      this.allLines.forEach(element => {
        k = false;
        // k = ll.find( g =>{
        //   g.LineId == element.Id;
        // });
  
        ll.forEach(d => {
          if(d.LineId == element.Id)
          {
            k = true;
          }
        });
    
       if(k ) {
          this.showList.push(element);
       }
      
      });
    }

  }
}
  
getLineIds(){
  let list: any = [];
  let k: boolean = false;
  let ll: any =[];
  
  if(this.allTimetables === void 0){

    this.showList = this.allLines;
  }
  else{
   
    //ovo vraca undefined
    // ll = this.allTimetables.find(u =>{
    //   u.DayTypeId == this.dt;
    // });

    this.allTimetables.forEach(element => {
     
      if(element.DayTypeId == this.dt)
      {
        ll.push(element);
      }
    });
   
    if(ll === void 0 || ll == [])
    {
      this.showList = this.allLines;
    }
    else {

    this.showList = [];
    this.allLines.forEach(element => {
      k = false;
      // k = ll.find( g =>{
      //   g.LineId == element.Id;
      // });

      ll.forEach(d => {
        if(d.LineId == element.Id)
        {
          k = true;
        }
      });
  
     if(!k ) {
        this.showList.push(element);
     }
    
    });
  }
  }
  
}

SelectedLine(event: any): void
{
  this.lineIdChoosen = event.target.value;
  if(event.target.value != 0){
    let k = parseInt(event.target.value,10);
    this.lineServ.FindVehicleId(k).subscribe(data =>{
    
        this.vehicleId = data;
        if(this.vehicleId){
          this.chooseVehicle = false;
        }
        else{
          this.vehicleServ.GetAllAvailableVehicles().subscribe(data =>{
            this.availableVehicles = data;
            this.chooseVehicle = true;
          });
        }
      
    });
   
    this.boolic = true;
    if(this.selected == "Change")
    {
      this.SplitDepartures();
    }
  }
  
}

SelectedVehicle(event: any): void
{
  this.vehicleId = event.target.value;
  
}
SplitDepartures(){

  this.stringovi1 = [];
  this.ttZaDodavanje = new TimetableModel("",0,0,0);
  this.allTimetables.forEach(element => {
    if(element.LineId == this.lineIdChoosen && element.DayTypeId == this.dt)
    {
      this.ttZaDodavanje = element;
    }
    
  });

  this.stringovi1= this.ttZaDodavanje.Departures.split(";");
  this.stringovi1.splice(this.stringovi1.length-1,1);
  this.stringovi = this.stringovi1;

}
addTime(n:any){
 
  console.log(n);
  this.stringovi.push(n);
  this.stringovi.sort((a,b)=> a.localeCompare(b));
  this.stringovi1 = this.stringovi;
  
}

ChangeTimetable()
{
  this.ttZaDodavanje.DayTypeId = this.dt;
  this.ttZaDodavanje.LineId = this.lineIdChoosen;
  let stringZaDodavanje : string = "";
  this.stringovi1.forEach(x => {
    stringZaDodavanje = stringZaDodavanje + x + ";";
  });
  this.ttZaDodavanje.Departures = stringZaDodavanje;
  this.timetableServ.changeTimetable(this.ttZaDodavanje.Id,this.ttZaDodavanje).subscribe();
}

AddTimetable(){
  this.ttZaDodavanje.DayTypeId = this.dt;
  this.ttZaDodavanje.LineId = this.lineIdChoosen;
  let stringZaDodavanje : string = "";
  this.stringovi1.forEach(x => {
    stringZaDodavanje = stringZaDodavanje + x + ";";
  });
  this.ttZaDodavanje.Departures = stringZaDodavanje;
  this.ttZaDodavanje.Vehicles.push(new VehicleModel(this.vehicleId));
  this.timetableServ.addTimetable(this.ttZaDodavanje).subscribe();

}
removeFromTimes(st,i){
  this.stringovi1.splice(i,1);
  this.stringovi = this.stringovi1;
  
}
DeleteTimetable()
{
  this.timetableServ.deleteTimetable(this.ttZaDodavanje.Id).subscribe();
}

}
