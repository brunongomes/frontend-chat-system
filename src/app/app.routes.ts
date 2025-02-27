import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatComponent } from './components/chat/chat.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { registerGuard } from './guards/register.guard';

export const routes: Routes = [
    { 
        path: 'login',
        canActivate: [loginGuard],
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    { 
        path: 'register',
        canActivate: [registerGuard],
        loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
    },
    { 
        path: 'chat',
        canActivate: [authGuard],
        loadComponent: () => import('./components/chat/chat.component').then(m => m.ChatComponent)
    },
    { 
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
