import { VehicleModel } from './vehicleModel';

export class TimetableModel{
    Id: number;
    Departures: string;
    
    LineId: number;
    DayTypeId: number;
    Vehicles: VehicleModel[];
    
    constructor( name: string, lId: number,dId: number,id: number ){
        this.Id = id;
        this.Departures = name;
       
        this.LineId = lId;
        this.DayTypeId = dId;
        this.Vehicles = [];
      
    }
}