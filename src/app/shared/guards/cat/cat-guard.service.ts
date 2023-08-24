import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { NewCatComponent } from 'src/app/cats/new-cat/new-cat.component';
import { AuthService } from '../../utils/Auth.service';
import { inject } from '@angular/core';

export const canDeactivateGuard: CanDeactivateFn<NewCatComponent> = (
  component: NewCatComponent
) => {
  if (!component.canExit) {
    component.openDialog();
    return false;
  }

  return true;
};

export const canActivateGuard: CanActivateFn = () => {
  let authService: AuthService = inject(AuthService);
  let router: Router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.parseUrl("/login");
  }

  return true;
};
