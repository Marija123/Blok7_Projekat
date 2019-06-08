import { StationModel } from './stationModel';

export class LineModel{
    Id: number;
    LineNumber: string;
    ColorLine: string;
    Stations: StationModel[] = [];
    
    
    constructor( id: number,  linenumber:string,stations: StationModel[], col:string ){
        this.Id = id;
        this.LineNumber = linenumber;
        this.Stations = stations;
        this.ColorLine = col;
      
    }
}