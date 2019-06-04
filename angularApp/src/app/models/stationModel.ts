export class StationModel{
    
    Name: string;
    
    Address: string;
    Longitude: number;
    Latitude: number;
    

    constructor( name: string,  address:string, lon: number,lat: number ){
        
        this.Name = name;
        this.Address = address
       
        this.Longitude = lon
        this.Latitude = lat
      
    }
}