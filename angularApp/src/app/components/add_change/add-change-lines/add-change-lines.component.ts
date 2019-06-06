import { Component, OnInit, NgZone, Output,Directive ,EventEmitter,Input, OnChanges,SimpleChanges} from '@angular/core';
import { Polyline } from 'src/app/models/map/polyliner';
import { GeoLocation } from 'src/app/models/map/geolocation';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { StationServiceService } from 'src/app/services/stationService/station-service.service';
import { MarkerInfo } from 'src/app/models/map/marker-info.model';
import { StationModel } from 'src/app/models/stationModel';
import { NgForm } from '@angular/forms';
import { LineModel } from 'src/app/models/lineModel';
import { LineServiceService } from 'src/app/services/lineService/line-service.service';
//import {LatLngLiteral} from '../../core/services/google-maps-types';

//@Directive({selector: 'agm-polyline-point'})

@Component({
  selector: 'app-add-change-lines',
  templateUrl: './add-change-lines.component.html',
  styleUrls: ['./add-change-lines.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}']
})
export class AddChangeLinesComponent implements OnInit {
  public polyline: Polyline;
  public selectedLines: LineModel[] = [];
  sl: LineModel = new LineModel(0,"",[]);
  selektovanaLinijaZaIzmenu: LineModel = new LineModel(0,"",[]);
  selLine: Polyline;
  id: number;
  idForRemove: number;
  selectedL: string = "none";
  selected: string = "";
  public zoom: number;
  stati: any = [];
  drugiMarkeriStati: any = [];
  markerInfo: MarkerInfo;
  pomStat: StationModel;
  allLines: any = [];
  selectedStations: StationModel[] = [];
  public latitude: number;
  public longitude: number;
  markerZaDodavanje: StationModel;


  
  iconPath : any = { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}}
  constructor(private ngZone: NgZone, private mapsApiLoader : MapsAPILoader , private statServ: StationServiceService, private lineServ: LineServiceService) { 
    this.statServ.getAllStations().subscribe(data => {
      this.stati = data;
      this.drugiMarkeriStati = data;
      }
    );

      this.lineServ.getAllLines().subscribe(data => {
        this.allLines = data;
        console.log(data);
      });
  }

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), 
    "assets/ftn.png",
    "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});

    this.mapsApiLoader.load().then(() =>{
      google.maps.event.addListener(this.sl, 'positionChanged', (function(selLine, i) {
        return function(event) {
          console.log(event.LatLngLiteral);
          alert("WTF");
        }
      }));
    });
  }
     
  
  // @Output() positionChanged: EventEmitter<LatLngLiteral> = new EventEmitter<LatLngLiteral>();
  // ngOnChanges(changes: SimpleChanges): any {
  //   if (changes['latitude'] || changes['longitude']) {
  //     const position: LatLngLiteral = <LatLngLiteral>{
  //       lat: changes['latitude'] ? changes['latitude'].currentValue : this.latitude,
  //       lng: changes['longitude'] ? changes['longitude'].currentValue : this.longitude
       
  //     };
     
  //     this.positionChanged.emit(position);
  //   }
  // }
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

  SelectedLine(event: any): void
  {
    this.selectedL = event.target.value;
    
    if(this.selectedL == "none" || this.selectedL == "")
    {
      this.selectedLines = [];
      this.sl = new LineModel(0,"",[]);
      this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});

    }
    // else if(this.selectedL = "ShowAll")
    // {
    //   this.selectedLines = this.allLines;
    // }
    else 
    {
      this.selectedLines = [];
      this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
      this.allLines.forEach(x => {
        if(x.LineNumber == this.selectedL)
        {
          this.selectedLines.push(x);
          this.selektovanaLinijaZaIzmenu = x;
          this.sl = x;
          this.idForRemove = x.Id;
          x.Stations.forEach(stat => {
            this.selLine.addLocation(new GeoLocation(stat.Longitude, stat.Latitude));
          });
          console.log(this.selLine);
        }
      });

      if(this.selected == "Change")
      {
        
      }
    }
  }

  // SelectedLine(event: any): void
  // {
  //   this.selectedL = event.target.value;
  //   if(this.selectedL == "none" || this.selectedL == "")
  //   {
  //     this.selectedLines = [];
  //   }
  //   else if(this.selectedL = "ShowAll")
  //   {
  //     this.selectedLines = this.allLines;
  //   }
  //   else 
  //   {
  //     this.selectedLines = [];
  //     this.allLines.array.forEach(x => {
  //       if(x.Name == this.selectedL)
  //       {
  //         this.selectedLines.push(x);
  //       }
  //     });
  //   }
    
  //}

 

  // pathChanged($event: EventEmitter)
  // {
  //   console.log($event.addListener())
  // }
  isSelectedLine(name: string): boolean
  {
    if (!this.selectedL) { // if no radio button is selected, always return false so every nothing is shown  
      return false;  
    }  
     return (this.selectedL === name); 
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
      window.alert("Line successfully added!");
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
      lineData.Stations = this.selektovanaLinijaZaIzmenu.Stations;
      lineData.Id = this.selektovanaLinijaZaIzmenu.Id;
      lineData.LineNumber = this.selektovanaLinijaZaIzmenu.LineNumber;
      console.log(lineData);
      this.lineServ.changeLine(this.selektovanaLinijaZaIzmenu.Id,lineData).subscribe();
    }
    else if(this.selected == "Remove"){
      this.lineServ.deleteLine(this.idForRemove).subscribe();
      window.alert("Line successfully removed!");
    }
    else{
      console.log("lalallaa")
    }
    //window.location.href = "/add_change_lines";
  }

  removeFromLine(stationId,i)
  {
    this.selektovanaLinijaZaIzmenu.Stations.splice(i,1);
  }

  addStationIntoLine(i: any, form: NgForm)
  {
    //this.selektovanaLinijaZaIzmenu.Stations.
    this.selektovanaLinijaZaIzmenu.Stations.splice(i.rBr-1,0,this.markerZaDodavanje);
    console.log(this.selektovanaLinijaZaIzmenu.Stations);
  }

  stationClick1( id: number){
    this.stati.forEach(element => {
     
       if(element.Id == id){
         this.markerZaDodavanje = element;
       }
 
    });
  
    console.log("marker za dodavanje:");
    console.log(this.markerZaDodavanje);
    
   }
  
}
