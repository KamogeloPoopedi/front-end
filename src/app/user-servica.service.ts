import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServicaService {
  private apiUrl = 'http://localhost:8080/api';
  private userUrl = 'http://localhost:8080/chat'

  constructor(private http: HttpClient) { }
  
  searchUsers(query:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/search?query=${query}`);

  }
  addContact(userId: number, contactId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/add/${contactId}`, {});
  }
  getCurrentUserId(): Observable<number> {
    return this.http.get<number>(this.userUrl);
  }
  getContacts():Observable<any>{
    // return this.http.get(`${this.userUrl}/list?userId=${userId}`)
    return this.getCurrentUserId().pipe(
      switchMap(userId => this.http.get(`${this.userUrl}/list?userId=${userId}`))
    );
  }
  
}
