import { Pipe, PipeTransform } from '@angular/core';
import { Race } from '../models/Race';

@Pipe({
  name: 'race',
})
export class RacePipe implements PipeTransform {
  transform(value: Race[]): string {
    if (value.length == 1) {
      return value[0].name;
    }

    return `${value[0].name}, ${value[1].name}`;
  }
}
