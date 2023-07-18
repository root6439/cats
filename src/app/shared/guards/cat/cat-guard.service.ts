import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { NewCatComponent } from 'src/app/cats/new-cat/new-cat.component';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const CatGuard: CanDeactivateFn<NewCatComponent> = (
  component: NewCatComponent
) => {
  if (!component.canExit) {
    component.openDialog();
    return false;
  }

  return true;
};
