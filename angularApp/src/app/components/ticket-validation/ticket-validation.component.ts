import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticketService/ticket.service';
import { TicketTypeModel } from 'src/app/models/ticketTypeModel';

@Component({
  selector: 'app-ticket-validation',
  templateUrl: './ticket-validation.component.html',
  styleUrls: ['./ticket-validation.component.css']
})
export class TicketValidationComponent implements OnInit {

  ticketForV : any;
  ticketExists: string = "";
  ticketMessage: string = "";
  ticketMessageError: string = "";
  ticketRet: any;
  allTT: any ;
  myInput1: string = "";
  myInput : number ;
  constructor(private ticketServ: TicketService) {
    this.ticketServ.getAllTicketTypes().subscribe(data => {
      this.allTT = data;
    })
   }

  ngOnInit() {
  }

  FindTicket(n:any){
 
    this.ticketMessage = "";
    this.ticketMessageError= "";
    this.myInput1 = "";
    console.log(n);
    if(n != null)
    {
      this.ticketServ.getTicket(n).subscribe(data => {
        this.ticketForV = data;
        
        if(this.ticketForV)
        {
            this.ticketExists = "";
            this.myInput1 = "";
            if(this.ticketForV.ApplicationUserId == "" || this.ticketForV.ApplicationUserId == undefined || this.ticketForV.ApplicationUserId == null)
            {
              this.ticketServ.validateTicketNoUser(this.ticketForV).subscribe(data =>{
                this.myInput1 = "";
                this.myInput = null;
                this.ticketForV = null;
                this.ticketMessage = data;
              },
              err =>
              {
                this.myInput1 = "";
                this.myInput = null;
                this.ticketForV = null;
                this.ticketMessageError = err.error;
              })
              //this.ValidateTicketNoUser();
            }
  
        }
        // else{
        //   this.ticketExists = "Ticket doesn't exist in database!"
      // }
      },
      err =>
      {
        this.myInput1 = "";
        this.myInput = null;
        this.ticketForV = null;
        this.ticketExists = err.error;
        //window.alert(err.error);
      });
    }
    
    
  }

  
ValidateTicket(n:any)
{
  this.ticketMessage = "";
  this.ticketMessageError= "";
  
  let sl = new TicketTypeModel(n,this.ticketForV.Id);
  this.ticketServ.validateTicket(sl).subscribe(data =>
    {
      
      this.myInput1 = "";
      this.myInput = null;
      this.ticketForV = null;
      this.ticketRet = data;
      if(this.ticketRet.Valid)
      {
        this.ticketMessage = this.ticketRet.Message;
      }else
      {
        this.ticketMessageError = this.ticketRet.Message;
      }
      
    },
    err =>
    {
      this.myInput1 = "";
      this.myInput = null;
      this.ticketForV = null;
      this.ticketMessageError = err.error;
    })
}
  
 

}
