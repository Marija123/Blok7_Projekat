import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticketService/ticket.service';
import { PricelistServiceService } from 'src/app/services/priceListService/pricelist-service.service';
import { TicketPricesPomModel } from 'src/app/models/ticketPricesPomModel';
import { PriceListModel } from 'src/app/models/pricelistModel';
import { UserProfileService } from 'src/app/services/userService/user-profile.service';
import { TypeModel } from 'src/app/models/typeModel';
import { TicketModel } from 'src/app/models/ticketModel';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-buy-a-ticket',
  templateUrl: './buy-a-ticket.component.html',
  styleUrls: ['./buy-a-ticket.component.css']
})
export class BuyATicketComponent implements OnInit {

  allTicketTypes : any = [];
  ticketTypeDetail: string = "";
  selecetTT : number;
  priceList: any;
  validPrices: TicketPricesPomModel;
  price: number;
  discount: number;
  priceWDiscount: number;
  user: any;
  neregKupVremKartu : boolean= false;
  poruka: string = "";



  constructor(private ticketServ: TicketService, private pricelistServ: PricelistServiceService, private usersService: UserProfileService) {
    ticketServ.getAllTicketTypes().subscribe( data => {
      this.allTicketTypes = data;
    });
    this.pricelistServ.getPricelist().subscribe(data => {
      this.priceList = data; 
       console.log(data);
    });
   }

  ngOnInit() {
  }

  SelectedTicketType(event)
  {
    
     this.selecetTT = parseInt(event.target.value, 10);
     this.priceList.TicketPricess.forEach(element => {
       if(element.TicketTypeId == this.selecetTT)
       {
        this.price = element.Price;
        
       }
       
     });
     let ro = localStorage.getItem('role');
    if(ro)
    {
      if(ro == "AppUser")
      {
        this.CalculateDiscount();

      }
    }else{
      this.discount = 0;
      this.priceWDiscount = this.price;
      if(this.selecetTT == 1)
      {
        this.neregKupVremKartu = true;
      }
      else{
        this.poruka = "Only signed in users can buy this type of ticked!"
        this.neregKupVremKartu = false;
      }

     
    }
  }

  CalculateDiscount(){
    let uN = localStorage.getItem('name');
    let typeM : any;
    this.ticketServ.getTypeUser(uN).subscribe(data =>{
      typeM = data;
      this.discount =  typeM.Coefficient * 100;
      this.priceWDiscount = this.price - (this.price * typeM.Coefficient) ;
    });
  }

  BuyTicket()
  {
    let ticketMod = new TicketModel("",new Date(),0,"",0,0);
    ticketMod.PurchaseTime = new Date();
    ticketMod.TicketTypeId = this.selecetTT;
    this.priceList.TicketPricess.forEach(element => {
      if(element.TicketTypeId == this.selecetTT)
      {
        ticketMod.TicketPricesId = element.Id;
      }
    });
    let ai : any;
    this.usersService.getUserData(localStorage.getItem('name')).subscribe(data =>{
      ai = data;
      ticketMod.ApplicationUserId = ai.Id;
      this.ticketServ.addTicket(ticketMod).subscribe();
    });

    
    
  }

 
}
