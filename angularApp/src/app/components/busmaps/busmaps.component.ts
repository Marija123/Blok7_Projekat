import { Component, OnInit, NgZone } from '@angular/core';
import { MarkerInfo } from 'src/app/models/map/marker-info.model';
import { Polyline } from 'src/app/models/map/polyliner';
import { GeoLocation } from 'src/app/models/map/geolocation';
import { MapsAPILoader } from '@agm/core';
import { StationServiceService } from 'src/app/services/stationService/station-service.service';
import { LineModel } from 'src/app/models/lineModel';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { LineServiceService } from 'src/app/services/lineService/line-service.service';

@Component({
  selector: 'app-busmaps',
  templateUrl: './busmaps.component.html',
  styleUrls: ['./busmaps.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}']
})
export class BusmapsComponent implements OnInit {

  stati: any = [];
  allLines: any = [];
  selectedL: string = "";
  sl: LineModel = new LineModel(0,"",[]);
  k: boolean[];
  selLine: Polyline;
  myGroup: FormGroup;
  show: boolean = false;
  markerInfo: MarkerInfo;
  iconPath : any = { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}}
  constructor(private ngZone: NgZone, private formBuilder: FormBuilder, private mapsApiLoader : MapsAPILoader , private statServ: StationServiceService, private lineServ: LineServiceService) { 
    
    this.statServ.getAllStations().subscribe(data => {
      this.stati = data;
      console.log(data);
      }
    );

      this.lineServ.getAllLines().subscribe(data => {
        this.allLines = data;
        console.log(data);
      });

      // if(this.allLines != []){
      //   //const formControls = this.allLines.map(control => new FormControl(false));
  
      //   // Simply add the list of FormControls to the FormGroup as a FormArray
      //   this.myGroup = this.formBuilder.group({
      //     allLines: new FormArray([]) //new FormArray(formControls)
      //   });

      //   this.addCheckBoxes();
      // }
      
  }


  private addCheckBoxes(){
    this.allLines.map((o,i)=> {
      const control = new FormControl(i === 0);
      (this.myGroup.controls.allLines as FormArray).push(control);
    });
    console.log("Metoda add checkBoxes");
  }

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), 
    "assets/ftn.png",
    "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
   
    
  }
 
  showCheckBoxes(){
    console.log("sssss");
    this.myGroup = this.formBuilder.group({
      allLines: new FormArray([]) //new FormArray(formControls)
    });

    this.addCheckBoxes();
    this.show = true;
  }

  SelectedLine(event: any): void
  {
    this.selectedL = event.target.value;
    
    if(this.selectedL == "none" || this.selectedL == "")
    {
    //  this.selectedLines = [];
      this.sl = new LineModel(0,"",[]);
      this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});

    }
     else if(this.selectedL = "ShowAll")
    {
      // this.selectedLines = this.allLines;
     }
    else 
    {
      
      this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
      this.allLines.forEach(x => {
        if(x.LineNumber == this.selectedL)
        {
          this.sl = x;
          x.Stations.forEach(stat => {
            this.selLine.addLocation(new GeoLocation(stat.Longitude, stat.Latitude));
          });
          console.log(this.selLine);
        }
      });

      
    }
  }


}
