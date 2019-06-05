export class StationModel{
    Id: number;
    Name: string;
    
    Address: string;
    Longitude: number;
    Latitude: number;
    
    
    constructor( name: string,  address:string, lon: number,lat: number,id: number ){
        this.Id = id;
        this.Name = name;
        this.Address = address
       
        this.Longitude = lon
        this.Latitude = lat
      
    }
}