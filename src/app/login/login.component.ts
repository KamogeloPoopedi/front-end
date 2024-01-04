import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password: string = '';
  userName: string = '';
 

  constructor(private authService: AuthServiceService, private router: Router) {}

  login() {
    const credentials = { userName: this.userName, password: this.password };
    this.authService.login(credentials).subscribe(
      (resultData: any) => {
        
        sessionStorage.setItem("currentuser",resultData);
        console.log(resultData);
        alert('User logged in');
        this.router.navigateByUrl("/chat-list");
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}

export interface UserDto {
  userId?: number; // optional for responses, not needed for requests
  fName?: string;
  lName?: string;
  email: string;
  password: string;
  userName: string;
}
