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
                this.ticketMessage = err.error;
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

  ValidateTicketNoUser()
  {
    
    let d : Date = new Date(this.ticketForV.PurchaseTime);

    
    d.setHours(d.getHours() + 1);
        if(d < new Date())
        {
          this.ticketMessage = "Ticket is not valid. Time is up!"
        }else
        {
          this.ticketMessage = "Ticket is valid."
        }
  }
  
ValidateTicket(n:any)
{
  let sl = new TicketTypeModel(n,this.ticketForV.Id);
  this.ticketServ.validateTicket(sl).subscribe(data =>
    {
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
      this.ticketMessage = err.error;
    })
}
  
  ValidateTicket1(n: any)
  {
    let TT : string = "";
    this.allTT.forEach(element => {
      if(this.ticketForV.TicketTypeId == element.Id)
      {
          TT = element.Name;
      }
      
    });
  
    let d : Date = new Date(this.ticketForV.PurchaseTime);

    if(n == this.ticketForV.ApplicationUserId)
    {

      if(TT == "Hourly")
      {
        d.setHours(d.getHours() + 1);
        if(d < new Date())
        {
          this.ticketMessage = "Ticket is not valid. Time is up!"
        }else
        {
          this.ticketMessage = "Ticket is valid."
        }
      }

      if(TT == "Daily")
      {
        if(d.getFullYear() < new Date().getFullYear())
        {
          this.ticketMessage = "Ticket is not valid. Time is up!"
        }else if(d.getFullYear() == new Date().getFullYear())
        {
          if(d.getMonth() < new Date().getMonth())
          {
            this.ticketMessage = "Ticket is not valid. Time is up!"
          }else if(d.getMonth() == new Date().getMonth())
          {
            if(d.getDate() == new Date().getDate())
            {
              this.ticketMessage = "Ticket is valid."
            }
            else{
              this.ticketMessage = "Ticket is not valid. Time is up!"
            }
          
          }
        }
      }

      if(TT == "Monthly")
      {
        if(d.getFullYear() < new Date().getFullYear())
        {
          this.ticketMessage = "Ticket is not valid. Time is up!"
        }else if(d.getFullYear() == new Date().getFullYear())
        {
          if(d.getMonth() == new Date().getMonth())
          {
            this.ticketMessage = "Ticket is valid."
          }
          else{
            this.ticketMessage = "Ticket is not valid. Time is up!"
          }
         
        }
      }

      if(TT == "Yearly")
      {
        if(d.getFullYear() == new Date().getFullYear())
        {
          this.ticketMessage = "Ticket is valid."
        }
        else
        {
          this.ticketMessage = "Ticket is not valid. Time is up!"
        }
      }

    }else
    {
      this.ticketMessage = "User with email: " + n + " did not buy ticket with Id: " + this.ticketForV.Id;
    }
    // this.MyInput1 = "";
    // n = "";
  }

}
