import { Component } from '@angular/core';

import { WebsocketService } from '../websocket.service';
import { Subscription } from 'rxjs';
import { UserServicaService } from '../user-servica.service';
import { AuthServiceService } from '../auth-service.service';
import { Message } from '../message';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  messageInput: string = '';
  receivedMessages: Message[] = [];
  private messageSubscription: Subscription;
  message: string | undefined;
isLoggedIn: any;

  constructor(private webSocketService: WebsocketService, private authService: AuthServiceService) {
    this.messageSubscription = this.webSocketService.receiveMessages().subscribe((message) => {
      this.receivedMessages.push(message);
       console.log('Received message:', message);
    });
  }
  get LoggedInUser():boolean{
    return this.authService.getLoggedInUser();
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  sendMessage() {
    
    // Assuming you have a method to get the logged-in user's ID
   
    const data = {
      senderId: this.LoggedInUser,
      receiverId: 952, // Replace with the contact you want to send the message to
      message: this.messageInput,
    };
    
    // if (this.messageInput && senderId) {
    //   this.webSocketService.sendMessage(this.messageInput, receiverId);
    //   this.messageInput = '';
    // }
    this.webSocketService.next(JSON.stringify(data));
    this.message = '';
    console.log(this.messageInput);
}
}

