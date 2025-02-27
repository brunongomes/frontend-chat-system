import { Component } from '@angular/core';
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
export class ChatComponent {
  messages: any[] = [];
  newMessage = '';
  subscription!: Subscription;

  constructor(
    private websocketService: WebsocketService,
    private router: Router,
    private authService: AuthService
  ) {
    this.websocketService.connect().subscribe((connected: any) => {
      if (connected) {
        this.websocketService.fetchMessages().subscribe();
        this.subscription = this.websocketService.listenMessages().subscribe(
          (message: any) => this.messages.push(message)
        );
      }
    });
  }

  sendMessage() {
    const responseWebsocket = this.websocketService.sendMessage(this.newMessage);
    if (!responseWebsocket) {
      alert('Você precisa estar logado para enviar mensagens!');
      this.router.navigate(['/login']);
    }
    this.newMessage = '';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.removeToken('authToken');
    this.authService.removeToken('userId');
    this.router.navigate(['/login']);
  }
}
