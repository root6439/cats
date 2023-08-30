import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(value: 'M' | 'F'): string {
    let obj = {
      M: 'Macho',
      F: 'Fêmea',
    };

    return obj[value];
  }
}
