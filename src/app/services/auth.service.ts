import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setToken(token: string, nameToken: string) {
    localStorage.setItem(nameToken, token);
  }

  getToken(nameToken: string) {
    return localStorage.getItem(nameToken);
  }

  removeToken(nameToken: string) {
    localStorage.removeItem(nameToken);
  }

  isLoggedIn(): boolean {
    return !!this.getToken('authToken');
  }
}
