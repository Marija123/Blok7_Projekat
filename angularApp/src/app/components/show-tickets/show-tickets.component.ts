import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticketService/ticket.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { TicketHelpModel } from 'src/app/models/ticketHelpModel';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-show-tickets',
  templateUrl: './show-tickets.component.html',
  styleUrls: ['./show-tickets.component.css']
})
export class ShowTicketsComponent implements OnInit {

  uniqueName : string = "";
  prikazKarata : boolean = false;
  allTickets: any  = [];
  blaa: any = [];

  navigationSubscription;
 
  constructor(private ticketServ: TicketService,  private router: Router) {


    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
       this.prikazi();
      }
    });

    
  }

  ngOnInit() {
  }

  prikazi(){
    this.prikazKarata = false;
    this.uniqueName = localStorage.getItem('name');
    if(this.uniqueName == "" || this.uniqueName == null)
    {
      this.prikazKarata = false;
    }
    this.ticketServ.getAllTicketsForOneUser(this.uniqueName).subscribe(data => {
      this.allTickets = [];
      this.prikazKarata = true;
      this.allTickets = data;
      this.allTickets.forEach(element => {
        let d : Date = new Date(element.PurchaseTime);
        let mesec : number = d.getMonth() + 1;
        let m : string = "";
        m = m+ d.getDate().toString() + ".";
        m = m+ mesec.toString() + ".";
        m = m + d.getFullYear().toString() + "." + "  ";
        m = m + d.getHours().toString() + ":";
        m = m + d.getMinutes().toString();

        this.blaa.push(m);
      });
      this.allTickets.reverse();
      this.blaa.reverse();
    },
    err =>{
      window.alert(err.error);
      this.prikazKarata = false;
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

}
