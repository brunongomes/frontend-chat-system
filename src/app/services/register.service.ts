import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:9007/api/auth/register';

  constructor(private http: HttpClient) {}

  register(user: { username: string, email: string, password: string }): Observable<void> {
    console.log(this.apiUrl)
    console.log(user);
    return this.http.post<void>(this.apiUrl, user);
  }
}
