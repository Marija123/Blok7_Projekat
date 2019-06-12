import { TicketTypeModel } from './ticketTypeModel';
import { TicketPricessModel } from './ticketPriceModel';

export class TicketModel{

Id:number;
Name: string;
PurchaseTime: Date;
TicketTypeId: number;
TicketPricesId: number;
ApplicationUserId: string;
TicketType: TicketTypeModel;

constructor( name: string,  pt:Date, ttid: number,auid: string,id: number ,tpid: number){
    this.Id = id;
    this.Name = name;
    this.PurchaseTime = pt;
    this.TicketTypeId = ttid;
    this.TicketPricesId = tpid;
    this.ApplicationUserId = auid;
    this.TicketType = new TicketTypeModel("", 0);
}

}

