import { Component } from '@angular/core';
import { UserServicaService } from '../user-servica.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  // providers: [MatIconModule],
})
export class SearchComponent {
  query: string = ''; 
  users: any[] = [];
  

  constructor(private userService: UserServicaService) {}
  
  searchUsers() {
    this.userService.searchUsers(this.query).subscribe(
      (resultData: any) => {
        this.users = resultData;
      },
      (error) => {
        console.error('User does not  exists');
      }
    );
  }
  addContact(userId: number, contactId: number) {
    if (!isNaN(userId) && !isNaN(contactId)) {
      // Call the addContact method
      this.userService.addContact(userId, contactId).subscribe(
        () => {
          console.log('Contact added successfully');
          // Optionally, you can update the UI or perform any additional actions
        },
        (error) => {
          console.error('Error adding contact', error);
        }
      );
    } else {
      console.error('Invalid userId or contactId');
    }
  }

}