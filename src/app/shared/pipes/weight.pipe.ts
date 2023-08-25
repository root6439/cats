import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight',
})
export class WeightPipe implements PipeTransform {
  transform(value: number): string {
    return `${value} kg`;
  }
}
