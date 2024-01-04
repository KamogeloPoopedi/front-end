import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
    private apiUrl = 'http://localhost:8080/api';
    private loggedInUser: any | null = null;
    

  
    constructor(private http: HttpClient) { }
  
    register(user: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/register`, user,  { responseType: 'text' });
    }
  
    login(credentials: { userName: string, password: string }): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, credentials, {
         responseType: 'text' });
    }
    setLoggedInUser(user: any) {
      this.loggedInUser = user;
    }
  
    // Assume this method is called to retrieve the logged-in user
    getLoggedInUser(): any | null {
      return this.loggedInUser;
    }
  
}

 