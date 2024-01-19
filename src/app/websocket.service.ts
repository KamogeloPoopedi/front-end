import { Injectable } from '@angular/core';
import { Stomp, CompatClient, StompSubscription } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient!: CompatClient;
  private serverUrl = 'ws://localhost:8080/ws'; // replace with your server URL
  private topic = '/topic/app';

  private messageSubject = new Subject<any>();

  constructor( ) {  this.initializeWebSocketConnection();}
  initializeWebSocketConnection() {
    this.stompClient = Stomp.over(() => new WebSocket(this.serverUrl));
    
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(this.topic, (message) => {
        this.messageSubject.next(JSON.parse(message.body));
      });
    });
  }

  sendMessage(message: string) {
    this.stompClient.send('/app/send', {}, JSON.stringify({ content: message }));
  }

  receiveMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

}
