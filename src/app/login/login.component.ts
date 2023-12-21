import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password: string = '';
  userName: string = '';
 

  constructor(private authService: AuthServiceService) {}

  login() {
    const credentials = { userName: this.userName, password: this.password };
    this.authService.login(credentials).subscribe(
      (resultData: any) => {
        console.log(resultData);
        alert('User logged in');
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
