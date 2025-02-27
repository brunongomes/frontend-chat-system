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
        component: LoginComponent,
        canActivate: [loginGuard],
    },
    { 
        path: 'register',
        component: RegisterComponent,
        canActivate: [registerGuard]
    },
    { 
        path: 'chat',
        component: ChatComponent,
        canActivate: [authGuard]
    },
    { 
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
