import { Component, NgZone, Input, AfterViewInit, ElementRef } from '@angular/core';
import { NotificationService } from './services/notificationService/notification.service';
import { NotificationMessage } from './models/notificationMessage';
import { ToastrService } from 'ngx-toastr';
import { decode } from 'punycode';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotificationService],
  
})
export class AppComponent implements AfterViewInit  {
  title = 'angularApp';
  public currentMessage: NotificationMessage;  
  public allMessages: any = "";  
  public canSendMessage: Boolean; 
  

  constructor(private elementRef: ElementRef, private notificationServ: NotificationService, private _ngZone: NgZone, private toastr: ToastrService) {    
    this.subscribeToEvents();  
    this.canSendMessage = notificationServ.connectionExists; 
    //this.sendMessage();
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#2e2e28';
 }

showMessage(message: string) {
  this.toastr.success(message, 'New notification!');
}  

// sendMessage(): void {
//   // send message to subscribers via observable subject
// this.notificationServ.sendMessage('Message from app Component to message Component!');   
// }

// clearMessage():void{
//   this.notificationServ.clearMessage();
// }

private subscribeToEvents(): void {   
  this.notificationServ.connectionEstablished.subscribe(() => {  
      this.canSendMessage = true;  
  });  
  this.notificationServ.messageReceived.subscribe((message: NotificationMessage) => {  
      this._ngZone.run(() => {  
          this.allMessages = message;

          if(!localStorage.jwt) return;
          if (localStorage.role == "Admin" || localStorage.role == "Controller"){
            //this.sendMessage();
            this.showMessage(this.allMessages)
          }
      });  
  });  
}  



}