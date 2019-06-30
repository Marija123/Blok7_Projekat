import { Component, OnInit } from '@angular/core';
import { LineServiceService } from 'src/app/services/lineService/line-service.service';
import { TimetableService } from 'src/app/services/timetableService/timetable.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  allLines: any = [];
 // allDayTypes: any = [];
  allTimetables: any = [];
  showList: any = [];
  dt: any;
  dt1: number;
  selectedDay : boolean  = false;
  lineIdChoosen: number;
  boolic: boolean = false;
  stringovi1 : string[] = [];
  SelectL: string = "None";
  boolZaOtvaranje: boolean = false;

  constructor(private lineServ: LineServiceService, private timetableServ: TimetableService) { 
    this.lineServ.getAllLines().subscribe(data => {
      this.allLines = data;
      console.log(data);

      this.timetableServ.getAllTimetables().subscribe(data => {
        this.allTimetables = data;
        console.log(data);
        this.setradio(1);

        this.boolZaOtvaranje = true;
      });

    });

    
    

    
  }


  ngOnInit() {
  }

  setradio(selected): void
  {
    console.log(selected);
    this.boolic= false;
    this.lineIdChoosen = 0;
    this.SelectL = "None";
    this.dt1 = selected;
    if(this.dt1 == 0)
    {
      this.selectedDay = false;
    }else {
      this.selectedDay = true;
      this.GetLineIds();
    }
  }

  

  GetLineIds()
  {

    let ll: any =[];
    let k : boolean = false;
    this.showList = [];
    if(this.allTimetables === void 0){
  
      this.showList = [];
    }
    else{
     
      this.allTimetables.forEach(element => {
       
        if(element.DayTypeId == this.dt1)
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

  SelectedLine(event: any): void
{
  if(this.lineIdChoosen != event.target.value)
  {
    this.lineIdChoosen = event.target.value;
    if(event.target.value != 0){
   
      
      this.boolic = true;
      
        this.SplitDepartures();
    }
    else
    {
      this.boolic = false;
    }
  }
  
}

SplitDepartures(){

  this.stringovi1 = [];
  
  this.allTimetables.forEach(element => {
    if(element.LineId == this.lineIdChoosen && element.DayTypeId == this.dt1)
    {
      this.stringovi1= element.Departures.split(";");
      this.stringovi1.splice(this.stringovi1.length-1,1);
      
    }
    
  });

  console.log(this.stringovi1);
  

}

}
