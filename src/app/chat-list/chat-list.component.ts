import { Component, Input, Output, EventEmitter} from '@angular/core';
import { UserServicaService } from '../user-servica.service';
import { AuthServiceService } from '../auth-service.service';
import { UserDto } from '../login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { WebsocketService } from '../websocket.service';
import { MessageComponent } from '../message/message.component';
import { Message, MessageDTO } from '../message';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
  @Input() isLoggedIn: boolean = false;
  @Input() loggedInUser: boolean = false;
  @Input() message: string = '';
  @Input() messages: string[] = [];
  @Output() sendMessage: EventEmitter<void> = new EventEmitter<void>();
  

    contactList: any[] = [];
    selectedContact: any | null = null;
    query: string = '';
    users: any[] = [];
    loggedinUsername : string = '';
    userdata! : UserDto ; 
    userIdString: any = sessionStorage.getItem("currentUser");
  
    constructor( private userService: UserServicaService, private authService : AuthServiceService,
      private webSocketService: WebsocketService){}


    ngOnInit(): void {
      this.loadContactList();
    //   this.loggedinUsername = this.authService.getCurrentUsername();
    // console.log('Welcom to your chats: ' , this.loggedinUsername);
      
  }
  
  loadContactList() {
   
    if(this.userIdString)
    {
       this.userdata = JSON.parse(this.userIdString); 
      this.loggedinUsername = this.userdata.userName;
  
      this.userService.getContactList(this.userdata.userId).subscribe(
        (data) => {
            this.contactList = data;
        },
        (error) => {
          console.error('Error fetchind contact list:', error);
      }
      );
    }

    
    }


    selectContact(contact: any) {
      this.selectedContact = contact;
      // this.webSocketService.sendMessage(contact.content, contact.receiverId)
    }
    searchUsers() {
      this.userService.searchUsers(this.query).subscribe(
        (resultData: any) => {
          this.users = resultData;
          // this.searchEvent.emit(this.query);
          
        },
        (error) => {
          console.error('User does not  exists');
        }
      );
    }

    addContact(contactUserId: number) {
      
      const userId: number = this.userdata.userId;
      console.log('userIdString:', userId);
      if (contactUserId !== undefined) {
        this.userService.addContact(userId, contactUserId).subscribe(
        
        );
        
      } else {
        console.error('contactUserId is undefined');
      }
    }

    // sendMassage(message : string){
       
    //   this.messages.push(message);
    // }
    
    sendMassage(message : string) {
    
      // Assuming you have a method to get the logged-in user's ID
      const senderId : any = this.authService.getLoggedInUser();
   
      const data : MessageDTO= {
        receiverId : this.selectedContact.userId ,
        senderId :senderId.userId ,
        content : message
       
      };
      console.log(message);
      this.messages.push(message);
      // if (this.messageInput && senderId) {
      //   this.webSocketService.sendMessage(this.messageInput, receiverId);
      //   this.messageInput = '';
      // }
      this.webSocketService.sendMessage(data,1);
      this.message = '';
      
  }

}


