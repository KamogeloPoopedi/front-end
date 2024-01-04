import { Component } from '@angular/core';
import { UserServicaService } from '../user-servica.service';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
    contactList: any[] = [];
    selectedContact: any | null = null;
    constructor( private userService: UserServicaService){}
    
    ngOnInit(): void {
      this.loadContactList();
  }
  loadContactList() {
    const userIdString: string | null = sessionStorage.getItem("currentuser");
    const userId: number = userIdString ? parseInt(userIdString, 10) : 0;

    this.userService.getContactList(userId).subscribe(
        (data) => {
            this.contactList = data;
        },
        (error) => {
          console.error('Error fetchind contact list:', error);
      }
      );
    }
    selectContact(contact: any) {
      this.selectedContact = contact;
    }
}
