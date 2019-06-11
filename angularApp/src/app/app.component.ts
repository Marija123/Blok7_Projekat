import { Component, NgZone, Input } from '@angular/core';
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
export class AppComponent {
  title = 'angularApp';
  public currentMessage: NotificationMessage;  
  public allMessages: any = "";  
  public canSendMessage: Boolean; 
  

  constructor(private notificationServ: NotificationService, private _ngZone: NgZone, private toastr: ToastrService) {    
    this.subscribeToEvents();  
    this.canSendMessage = notificationServ.connectionExists; 
}

showMessage(message: string) {
  this.toastr.success(message, 'New notification!');
}  

private subscribeToEvents(): void {   
  this.notificationServ.connectionEstablished.subscribe(() => {  
      this.canSendMessage = true;  
  });  
  this.notificationServ.messageReceived.subscribe((message: NotificationMessage) => {  
      this._ngZone.run(() => {  
          this.allMessages = message;

          if(!localStorage.jwt) return;
          if (localStorage.role == "Admin"){
            this.showMessage(this.allMessages)
          }
      });  
  });  
}  



}