import { Component, ViewChild } from '@angular/core';
import { UserServicaService } from '../user-servica.service';
import { SearchComponent } from '../search/search.component';
import { AuthServiceService } from '../auth-service.service';
import { UserDto } from '../login/login.component';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
    contactList: any[] = [];
    selectedContact: any | null = null;
    query : string = ''
    constructor( private userService: UserServicaService, private authService : AuthServiceService){}
    
    @ViewChild(SearchComponent) searchComponent!: SearchComponent;

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
    searchUsers( query : string) {
      this.searchComponent.searchUsers();
    }
    handleSearch(query: string) {
      // You can perform additional actions if needed
      console.log('Search performed with query:', query);
    }
    addContact(){
      this.authService.getLoggedInUser().then((loggedInUser: UserDto | null) => {
        if (loggedInUser && loggedInUser.userId !== undefined && this.selectedContact) {
          const userId = loggedInUser.userId;
          const contactId = this.selectedContact.contactId;
    
          if (userId && contactId) {
            this.searchComponent.addContact(userId, contactId);
          } else {
            console.error('Invalid userId or contactId.');
          }
        } else {
          console.error('User not logged in or selected contact not defined.');
        }
      });
    }
}
