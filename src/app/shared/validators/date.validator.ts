import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  public static isValidDate = (c: AbstractControl) => {
    let timestamp = new Date(c.value).getTime();
    let timestampToday = new Date().getTime();

    return timestamp > timestampToday ? { invalidDate: true } : null;
  };
}
