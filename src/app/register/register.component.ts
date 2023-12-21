import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  userName: string = '';

  constructor(private authService: AuthServiceService) {}

  register() {
    // Pass user details as an object
    const user = { email: this.email, password: this.password, userName: this.userName };

    this.authService.register(user).subscribe(
      (response: any) => {
        console.log(response);
        if (response.includes('registered successfully')) {
          console.log('Registration successful:', response);
          alert("User registered successfully")
        } else {
          console.error('Registration failed:', response);
        }
      },
      (error) => {
        console.error('Registration failed', error);
        alert("User already exits")
      }
    );
  }

}
