import { Component, OnInit, NgZone } from '@angular/core';
import { Polyline } from 'src/app/models/map/polyliner';
import { GeoLocation } from 'src/app/models/map/geolocation';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { StationServiceService } from 'src/app/services/stationService/station-service.service';
import { MarkerInfo } from 'src/app/models/map/marker-info.model';
import { StationModel } from 'src/app/models/stationModel';
import { NgForm } from '@angular/forms';
import { LineModel } from 'src/app/models/lineModel';
import { LineServiceService } from 'src/app/services/lineService/line-service.service';

@Component({
  selector: 'app-add-change-lines',
  templateUrl: './add-change-lines.component.html',
  styleUrls: ['./add-change-lines.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}']
})
export class AddChangeLinesComponent implements OnInit {
  public polyline: Polyline;
  id: number;
  selected: string = "";
  public zoom: number;
  stati: any = [];
  markerInfo: MarkerInfo;
  pomStat: StationModel;
  allLines: LineModel[] = [];
  selectedStations: StationModel[] = [];
  
  iconPath : any = { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}}
  constructor(private ngZone: NgZone, private mapsApiLoader : MapsAPILoader , private statServ: StationServiceService, private lineServ: LineServiceService) { 
    this.statServ.getAllStations().subscribe(data => {
      this.stati = data;
      }
    );

     this.lineServ.getAllLines().subscribe(data => {
    this.allLines = data;
     console.log(data);
       }
     
   );
  }

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), 
    "assets/ftn.png",
    "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
  }

  
  stationClick( id: number){
   this.stati.forEach(element => {
    
      if(element.Id == id){
        this.pomStat = element;
      }

   });
 
   console.log("pomStat:");
   console.log(this.pomStat);
   this.selectedStations.push(this.pomStat);
    this.polyline.addLocation(new GeoLocation(this.pomStat.Latitude, this.pomStat.Longitude))
    this.id = id;
  }

  setradio(e: string): void   
  {  
        this.selected = e;  
  }  

  isSelected(name: string): boolean   
  {  
  
        if (!this.selected) { // if no radio button is selected, always return false so every nothing is shown  
            return false;  
        }  
  
        return (this.selected === name); // if current radio button is selected, return true, else return false  
  } 

  onSubmit(lineData: LineModel, form: NgForm){
    
    if(this.selected == "Add")
    {
      //this.authService.register(stationData).subscribe();
      lineData.Stations = this.selectedStations;
     
      console.log(lineData)
      this.lineServ.addLine(lineData).subscribe();
    }
    else if(this.selected == "Change"){
      // stationData.Latitude = this.coordinates.latitude;
      // stationData.Longitude = this.coordinates.longitude;
      // stationData.Address = this.address;
      // stationData.Name = this.name;
      // stationData.Id = this.id;
      // console.log(":stationdaya:")
      // console.log(stationData)
      // this.statServ.changeStation(stationData).subscribe();
    }
    else if(this.selected == "Remove"){
     // this.statServ.deleteStation(this.id).subscribe();
    }
    else{
      console.log("lalallaa")
    }

  }
}
