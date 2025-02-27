import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  validationErrors = '';

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  register() {
    this.registerService.register({
      username: this.name,
      email: this.email,
      password: this.password
    })
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err: { error: { message: string; }; }) => {
          this.validationErrors = err.error.message || 'Erro ao cadastrar';
        }
      });
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
