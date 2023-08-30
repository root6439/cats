import { Race } from './Race';

export class Cat {
  id?: number;
  name: string;
  length: number;
  weight: number;
  birth: Date;
  gender: 'M' | 'F';
  races: Race[];
}
