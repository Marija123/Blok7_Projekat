export class TimetableModel{
    Id: number;
    Departures: string;
    
    LineId: number;
    DayTypeId: number;
    
    
    constructor( name: string, lId: number,dId: number,id: number ){
        this.Id = id;
        this.Departures = name;
       
        this.LineId = lId;
        this.DayTypeId = dId;
      
    }
}