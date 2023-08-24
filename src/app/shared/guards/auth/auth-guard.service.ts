import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../utils/Auth.service';

export const AuthGuard: CanActivateFn = () => {
  let router = inject(Router);
  let toast = inject(ToastrService);
  let authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    toast.error('Erro', 'Faça login novamente');
    return router.parseUrl('/login');
  }
};
