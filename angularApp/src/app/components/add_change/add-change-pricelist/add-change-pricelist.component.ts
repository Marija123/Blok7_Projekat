import { Component, OnInit } from '@angular/core';
import { PricelistServiceService } from 'src/app/services/priceListService/pricelist-service.service';
import { PriceListModel } from 'src/app/models/pricelistModel';
import { NgForm } from '@angular/forms';
import { TicketPricesPomModel } from 'src/app/models/ticketPricesPomModel';
import { TicketPricessModel } from 'src/app/models/ticketPriceModel';

@Component({
  selector: 'app-add-change-pricelist',
  templateUrl: './add-change-pricelist.component.html',
  styleUrls: ['./add-change-pricelist.component.css']
})
export class AddChangePricelistComponent implements OnInit {
priceList: any;
ticketPricesPom: TicketPricesPomModel = new TicketPricesPomModel(0,0,0,0,0,new PriceListModel(new Date(),new Date(),0, []));
datumVazenjaBool: boolean = false;
validPrices: TicketPricesPomModel;
  constructor( private pricelistServ: PricelistServiceService) { 
    this.refresh();
     
  }

  ngOnInit() {
  }

  onSubmit(pm: PriceListModel, form: NgForm){
  let priceL : any;
  let bol : boolean = false;
  this.ticketPricesPom.PriceList = pm;
  this.pricelistServ.addPricelist(this.ticketPricesPom).subscribe(data =>
  {
    window.alert("Timetable successfully added!");
    this.refresh();
  })

  }
  onSubmit1(pm: TicketPricesPomModel, form: NgForm){
    this.ticketPricesPom = pm;
    this.datumVazenjaBool = true;

  }
  refresh(){
    this.ticketPricesPom  = new TicketPricesPomModel(0,0,0,0,0,new PriceListModel(new Date(),new Date(),0, []));
     this. datumVazenjaBool = false;
    this.datumVazenjaBool= false;
    this.pricelistServ.getPricelist().subscribe(data => {
      
      this.priceList = data; 
       console.log(data);
      
       this.validPrices = new TicketPricesPomModel(0,0,0,0,0,new PriceListModel(new Date(),new Date(),0, []))
       this.priceList.TicketPricess.forEach(element => {
        if(element.TicketTypeId == 2)
        {
          this.validPrices.Daily = element.Price;
        }
        if(element.TicketTypeId == 1)
        {
          this.validPrices.Hourly = element.Price;
        }
        if(element.TicketTypeId == 3)
        {
          this.validPrices.Monthly = element.Price;
        }
        if(element.TicketTypeId == 4)
        {
          this.validPrices.Yearly = element.Price;
        }
        
      });
     });
  }

}
