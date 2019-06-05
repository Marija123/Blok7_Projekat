import { Component, OnInit, NgZone } from '@angular/core';
import { Polyline } from 'src/app/models/map/polyliner';
import { GeoLocation } from 'src/app/models/map/geolocation';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { StationServiceService } from 'src/app/services/stationService/station-service.service';
import { MarkerInfo } from 'src/app/models/map/marker-info.model';
import { StationModel } from 'src/app/models/stationModel';

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
  
  iconPath : any = { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}}
  constructor(private ngZone: NgZone, private mapsApiLoader : MapsAPILoader , private statServ: StationServiceService) { 
    this.statServ.getAllStations().subscribe(data => {
      this.stati = data;
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


}
