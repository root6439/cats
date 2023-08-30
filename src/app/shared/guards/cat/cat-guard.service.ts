import { CanDeactivateFn } from '@angular/router';
import { NewCatComponent } from 'src/app/cats/new-cat/new-cat.component';

export const canDeactivateGuard: CanDeactivateFn<NewCatComponent> = (
  component: NewCatComponent
) => {
  if (component.canExit || component.formCat.pristine) {
    return true;
  }

  return component.openDialog();
};
