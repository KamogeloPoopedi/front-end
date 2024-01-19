import { Component } from '@angular/core';

import { WebsocketService } from '../websocket.service';
import { Subscription } from 'rxjs';
import { UserServicaService } from '../user-servica.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  messageInput: string = '';
  receivedMessages: string[] = [];
  private messageSubscription: Subscription;

  constructor(private webSocketService: WebsocketService) {
    this.messageSubscription = this.webSocketService.receiveMessages().subscribe((message) => {
      this.receivedMessages.push(message.content);
    });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  sendMessage() {
    
    if (this.messageInput) {
      this.webSocketService.sendMessage(this.messageInput);
      this.messageInput = '';
    }
  }

}
