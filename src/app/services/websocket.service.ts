import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, map } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socket!: any;
  private apiUrl = `${environment.apiUrl}/api/chat`;
  public messages: any[] = [];
  private page = 1;
  private pageSize = 20;

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
        this.messages = [...this.messages, message];
        observer.next(message);
      });
    });
  }

  fetchMessages() {
    return this.http.get<any[]>(`${this.apiUrl}/all`).pipe(
      tap((messages: any[]) => {
        this.messages = messages.slice(0, this.pageSize);
      })
    );
  }

  loadMoreMessages() {
    this.page++;
    return this.http.get<any[]>(`${this.apiUrl}/all?page=${this.page}&pageSize=${this.pageSize}`).pipe(
      tap((newMessages: any[]) => {
        this.messages = [...this.messages, ...newMessages];
      })
    );
  }

  sendMessage(message: string) {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    
    return this.socket.emit('chat message', {
      userId,
      message,
      timestamp: new Date().toISOString()
    });
  }
}
