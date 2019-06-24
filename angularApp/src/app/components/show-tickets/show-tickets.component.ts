import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticketService/ticket.service';

@Component({
  selector: 'app-show-tickets',
  templateUrl: './show-tickets.component.html',
  styleUrls: ['./show-tickets.component.css']
})
export class ShowTicketsComponent implements OnInit {

  uniqueName : string = "";
  prikazKarata : boolean = false;
  allTickets: any  = [];
  constructor(private ticketServ: TicketService) {
    this.uniqueName = localStorage.getItem('name');
    if(this.uniqueName == "" || this.uniqueName == null)
    {
      this.prikazKarata = false;
    }
    ticketServ.getAllTicketsForOneUser(this.uniqueName).subscribe(data => {
      this.allTickets = data;
      this.prikazKarata = true;
    },
    err =>{
      window.alert(err.error);
      this.prikazKarata = false;
    });
  }

  ngOnInit() {
  }

}
