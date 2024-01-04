import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServicaService {
  private apiUrl = 'http://localhost:8080/api';
  private baseUrl = 'http://localhost:8080/api/contacts';

  constructor(private http: HttpClient) { }
  
  searchUsers(query:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/search?query=${query}`);

  }
  addContact(userId: number, contactId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/add/${contactId}`, {});
  }
  getContactList(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/list?userId=${userId}`);
}
  
}
