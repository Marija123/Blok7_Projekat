import { StationModel } from './stationModel';

export class LineModel{
    Id: number;
    LineNumber: string;
    Stations: StationModel[];
    
    
    constructor( id: number,  linenumber:string,stations: StationModel[] ){
        this.Id = id;
        this.LineNumber = linenumber;
        this.Stations = stations;
      
    }
}