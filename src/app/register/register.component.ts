import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  userName: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  register() {
    // Pass user details as an object
    const user = { email: this.email, password: this.password, userName: this.userName };

    this.authService.register(user).subscribe(
      (response: any) => {
        console.log(response);
        if (response.includes('registered successfully')) {
          console.log('Registration successful:', response);
          alert("User registered successfully")
          this.router.navigateByUrl("/login");
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
