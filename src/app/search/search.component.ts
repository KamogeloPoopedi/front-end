import { Component } from '@angular/core';
import { UserServicaService } from '../user-servica.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [MatIconModule],
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

}
