import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehicleModel } from 'src/app/models/vehicleModel';
import { VehicleService } from 'src/app/services/vehicleService/vehicle.service';

@Component({
  selector: 'app-add-change-vehicle',
  templateUrl: './add-change-vehicle.component.html',
  styleUrls: ['./add-change-vehicle.component.css']
})
export class AddChangeVehicleComponent implements OnInit {
  private selected: string="";
  constructor(private vehicleServ: VehicleService) { }

  ngOnInit() {
  }
  onSubmit(vehicleData: VehicleModel, form: NgForm){
    
    if(this.selected == "Add")
    {
     
      console.log(vehicleData)
      this.vehicleServ.addVehicle(vehicleData).subscribe();
      window.alert("Station successfully added!");
    }
    // else if(this.selected == "Remove"){
    //   this.statServ.deleteStation(this.id).subscribe();
    //   window.alert("Station successfully removed!");
    // }
    else{
      console.log("lalallaa")
    }
    //window.location.href = "/add_change_stations";
    
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
