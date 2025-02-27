import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = () => {
  const authService = new AuthService();
  if (authService.isLoggedIn()) {
    const router = new Router();
    router.navigate(['/chat']);
    return false;
  }

  return true;
};
