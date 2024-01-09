import { Component, ViewChild } from '@angular/core';
import { UserServicaService } from '../user-servica.service';
import { AuthServiceService } from '../auth-service.service';
import { UserDto } from '../login/login.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
    contactList: any[] = [];
    selectedContact: any | null = null;
    query: string = ''; 
    users: any[] = [];
    constructor( private userService: UserServicaService, private authService : AuthServiceService){}


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
    // addContact(userId: number, contactUserId: number) {
    //   console.log('Attempting to add contact with userId:', userId, 'and contactId:', contactUserId);
    //   if (!!isNaN(userId) && !isNaN(contactUserId) && userId > 0 && contactUserId > 0) {
    //     // Call the addContact method
    //     this.userService.addContact(userId, contactUserId).subscribe(
    //       () => {
    //         console.log('Contact added successfully');
            
    //         // Optionally, you can update the UI or perform any additional actions
    //       },
    //       (error) => {
    //         console.error('Error adding contact', error);
    //       }
    //     );
    //   } else {
    //     console.error('Invalid userId or contactId');
    //   }
    // }
    addContact(contactUserId: number) {
      const userIdString: string | null = sessionStorage.getItem("currentuser");
      const userId: number = userIdString ? parseInt(userIdString, 10) : 0;

      if (contactUserId !== undefined) {
        this.userService.addContact(userId, contactUserId).subscribe(
          // ... rest of the code
        );
      } else {
        console.error('contactUserId is undefined');
      }
    }
    

}
