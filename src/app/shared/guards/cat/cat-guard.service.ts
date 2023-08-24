import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { NewCatComponent } from 'src/app/cats/new-cat/new-cat.component';

export const canDeactivateGuard: CanDeactivateFn<NewCatComponent> = (
  component: NewCatComponent
) => {
  return true;
  if (!component.canExit) {
    component.openDialog();
    return false;
  }

  return true;
};
