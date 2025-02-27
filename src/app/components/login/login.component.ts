import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  message = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    const { username, password } = this.loginForm.value;
    if (username && password) {
      this.loginService.login({ username, password })
      .subscribe({
        next: (response: any) => {
          this.authService.setToken(response.token, 'authToken');
          this.authService.setToken(response.userId, 'userId');
          this.router.navigate(['/chat']);
        },
        error: (err: { error: { message: string; error: string; }; }) => {
          this.message = err.error.message || 'Erro ao autenticar';
        }
      });
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
