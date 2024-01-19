import { Injectable } from '@angular/core';
import { Stomp, CompatClient, StompSubscription } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient!: CompatClient;
  private serverUrl = 'ws://localhost:8080/ws'; // replace with your server URL
  private topic = '/topic/app';

  private messageSubject = new Subject<any>();

  constructor(private authService: AuthServiceService ) {  this.initializeWebSocketConnection();}
  initializeWebSocketConnection() {
    this.stompClient = Stomp.over(() => new WebSocket(this.serverUrl));
    
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(this.topic, (message) => {
        const parsedMessage = JSON.parse(message.body) as Message;
        this.messageSubject.next(parsedMessage);
      });
    });
  }

  sendMessage(content: string, receiverId: number) {
    const senderId = this.authService.getLoggedInUser();
    const message: Message = {content, senderId, receiverId};
    this.stompClient.send('/app/send', {}, JSON.stringify( message ));
  }

  receiveMessages(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

}
