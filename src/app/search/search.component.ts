import { Component } from '@angular/core';
import { UserServicaService } from '../user-servica.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = ''; // Ensure that you have declared 'query' property here
  users: any[] = [];

  constructor(private userService: UserServicaService) {}

  searchUsers() {
    this.userService.searchUsers(this.query).subscribe(
      (resultData: any) => {
        this.users = resultData;
      },
      (error) => {
        console.error('Error searching users', error);
      }
    );
  }

}
