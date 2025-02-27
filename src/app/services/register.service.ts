import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = `${environment.apiUrl}/api/auth/register`;

  constructor(private http: HttpClient) {}

  register(user: { username: string, email: string, password: string }): Observable<void> {
    console.log(this.apiUrl)
    console.log(user);
    return this.http.post<void>(this.apiUrl, user);
  }
}
