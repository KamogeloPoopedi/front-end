import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServicaService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }
  searchUsers(query:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/search?query=${query}`);

  }
  addContact(userId: number, contactId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/add/${contactId}`, {});
  }
  
}
