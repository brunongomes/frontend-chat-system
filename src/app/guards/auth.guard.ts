import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = new AuthService();
  if (authService.isLoggedIn()) {
    return true;
  }

  const router = new Router();
  router.navigate(['/login']);
  return false;
};
