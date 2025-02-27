import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: any; 
  private apiUrl = `${environment.apiUrl}/api/chat`;

  constructor(private http: HttpClient) {
    this.socket = io(environment.wsUrl, {
      path: '/socket.io',
      auth: {
        token: localStorage.getItem('token')
      }
    });
  }

  connect() {
    return new Observable((observer) => {
      this.socket.on('connect', () => {
        observer.next(true);
      });
    });
  }

  listenMessages() {
    return new Observable((observer) => {
      this.socket.on('chat message', (message: any) => {
        observer.next(message);
      });
    });
  }

  fetchMessages() {
    return this.http.get<any[]>(`${this.apiUrl}/all`).pipe(
      tap((messages: any[]) => {
        messages.forEach(msg => this.socket.emit('chat message', msg));
      })
    );
  }

  sendMessage(message: string) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return;
    }
    return this.socket.emit('chat message', {
      userId: userId,
      message: message,
      timestamp: new Date().toISOString()
    });
  }
}
