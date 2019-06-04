import { Component, OnInit, NgZone } from '@angular/core';
import { GeoLocation } from 'src/app/models/map/geolocation';
import { MarkerInfo } from 'src/app/models/map/marker-info.model';
//import { google } from '@agm/core/services/google-maps-types';
import { MapsAPILoader } from '@agm/core';
import { StationModel } from 'src/app/models/stationModel';
import { NgForm } from '@angular/forms';
import { StationServiceService } from 'src/app/services/stationService/station-service.service';

@Component({
  selector: 'app-add-change-stations',
  templateUrl: './add-change-stations.component.html',
  styleUrls: ['./add-change-stations.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}']
})
export class AddChangeStationsComponent implements OnInit {
  private selected: string="";
  coordinates: GeoLocation = new GeoLocation(0,0); 
  markerInfo: MarkerInfo;
  private geocoder;
  address: string;
  constructor(private ngZone: NgZone, private mapsApiLoader : MapsAPILoader, private statServ: StationServiceService) { }

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), 
    "assets/ftn.png",
    "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.mapsApiLoader.load().then(() =>{
     
      this.geocoder = new google.maps.Geocoder();
    });
  }

  onSubmit(stationData: StationModel, form: NgForm){
    
    if(this.selected == "Add")
    {
      //this.authService.register(stationData).subscribe();
      stationData.Latitude = this.coordinates.latitude;
      stationData.Longitude = this.coordinates.longitude;
      stationData.Address = this.address;
      console.log(stationData)
      this.statServ.addStation(stationData).subscribe();
    }
    else{
      console.log("lalallaa")
    }

    
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

  placeMarker1($event){
    this.coordinates = new GeoLocation($event.coords.lat, $event.coords.lng);
    this.getAddress(this.coordinates.latitude,this.coordinates.longitude);
    // this.markerInfo = new MarkerInfo(this.coordinates, 
    // "assets/busicon.png",
    // "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");

    //console.log(this.address);
  }

  getAddress(latitude: number,longitude:number){
    this.geocoder.geocode({'location': {lat: latitude, lng: longitude}}, (results,status) =>{
      console.log(results);
      if(status === 'OK'){
          if(results[0]){
            this.address = results[0].formatted_address;
          }
          else{
            window.alert('no results found');
          }
      }
    });
    
  }
}
