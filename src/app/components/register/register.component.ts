import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  validationErrors = '';

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  register() {
    if (this.registerForm.invalid) return;

    this.registerService.register({
      username: this.registerForm.value.name ?? '',
      email: this.registerForm.value.email ?? '',
      password: this.registerForm.value.password ?? ''
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
