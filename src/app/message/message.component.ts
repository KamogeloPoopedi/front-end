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

  constructor(private webSocketService: WebsocketService, private authService: AuthServiceService) {
    this.messageSubscription = this.webSocketService.receiveMessages().subscribe((message) => {
      this.receivedMessages.push(message);
      console.log('Received message:', message);
    });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  sendMessage() {
    
    // Assuming you have a method to get the logged-in user's ID
    const senderId = this.authService.getLoggedInUser()/* Set the recipient user's ID here */;
    
    const receiverId = this.authService.getLoggedInUser()/* Set the recipient user's ID here */;
    
    if (this.messageInput && senderId) {
      this.webSocketService.sendMessage(this.messageInput, receiverId);
      this.messageInput = '';
    }

}
}
