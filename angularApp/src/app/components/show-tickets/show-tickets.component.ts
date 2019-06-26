import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticketService/ticket.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { TicketHelpModel } from 'src/app/models/ticketHelpModel';

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
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
       this.prikazi();
      }
    });

    
  }

  ngOnInit() {
  }

  prikazi(){
    this.prikazKarata = false;
    //this.allTickets= [];
    this.uniqueName = localStorage.getItem('name');
    if(this.uniqueName == "" || this.uniqueName == null)
    {
      this.prikazKarata = false;
    }
    this.ticketServ.getAllTicketsForOneUser(this.uniqueName).subscribe(data => {
      this.allTickets = [];
      //this.blaa = [];
      this.prikazKarata = true;
      this.allTickets = data;
      // this.blaa.forEach(element => {
      //   this.allTickets.push(element);
      // });
      // //this.prikazKarata = true;
      // console.log("blaa", this.blaa);
      // console.log("allTickets",this.allTickets);
    },
    err =>{
      window.alert(err.error);
      this.prikazKarata = false;
    });
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

}
