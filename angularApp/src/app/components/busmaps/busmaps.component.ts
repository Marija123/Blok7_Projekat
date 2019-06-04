import { Component, OnInit, NgZone } from '@angular/core';
import { MarkerInfo } from 'src/app/models/map/marker-info.model';
import { Polyline } from 'src/app/models/map/polyliner';
import { GeoLocation } from 'src/app/models/map/geolocation';

@Component({
  selector: 'app-busmaps',
  templateUrl: './busmaps.component.html',
  styleUrls: ['./busmaps.component.css']
})
export class BusmapsComponent implements OnInit {

 


  constructor(private ngZone: NgZone) { }

  ngOnInit() {

   
  }
 
}
