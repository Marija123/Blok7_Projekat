export class TicketHelpModel{

    Id:number;
    ExparationTime: string;
    PurchaseTime: Date;
    TicketType: string;
    TicketPrice: number;
   
    constructor( name: string,  pt:Date, ttid: string,id: number ,tpid: number){
        this.Id = id;
        this.ExparationTime = name;
        this.PurchaseTime = pt;
        this.TicketType = ttid;
        this.TicketPrice = tpid;
       
    }
    
    }