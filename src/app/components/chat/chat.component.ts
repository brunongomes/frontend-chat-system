import { Component, OnDestroy, TrackByFunction } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnDestroy {
  messages: any[] = [];
  newMessage = '';
  subscription!: Subscription;
  trackMessage: TrackByFunction<any> = (index, message) => message.id;
  loading = false;

  constructor(
    private websocketService: WebsocketService,
    private router: Router,
    private authService: AuthService
  ) {
    this.initWebSocket();
  }

  private initWebSocket() {
    this.websocketService.connect().subscribe({
      next: (value: unknown) => {
        const connected = value as boolean;
        if (connected) {
          this.loadMessages();
          this.setupMessageListener();
        }
      }
    });
  }

  private loadMessages() {
    this.websocketService.fetchMessages().subscribe({
      next: () => {
        this.messages = this.websocketService.messages;
      }
    });
  }

  private setupMessageListener() {
    this.subscription = this.websocketService.listenMessages().subscribe({
      next: (message: any) => {
        this.messages = [...this.messages, message];
      }
    });
  }

  sendMessage() {
    if (!this.authService.isLoggedIn()) {
      alert('Você precisa estar logado!');
      this.router.navigate(['/login']);
      return;
    }

    this.websocketService.sendMessage(this.newMessage).subscribe({
      next: () => {
        this.newMessage = '';
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.websocketService.socket?.disconnect();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
