import { Component } from '@angular/core';
import { UserServicaService } from '../user-servica.service';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
  contacts !: any[];
    constructor( private userService: UserServicaService){}
    
  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.userService.getContacts().subscribe(
      (data: any[]) => {
        this.contacts = data;
      },
      error => {
        console.error('Error fetching contacts: ', error);
      }
    );
    }
}
