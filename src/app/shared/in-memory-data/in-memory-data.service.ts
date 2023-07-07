import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Cat } from '../models/Cat.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const cats: Cat[] = [
      { id: 1, name: 'Cesar', length: 0.3, weight: 4.0, race: 'Ciamês' },
      { id: 2, name: 'Augusto', length: 0.5, weight: 4.0, race: 'Persa' },
      { id: 3, name: 'Ronaldo', length: 0.1, weight: 4.0, race: 'Burmês' },
      { id: 4, name: 'Gato', length: 0.2, weight: 4.0, race: 'Bengal' },
      { id: 5, name: 'Farofa', length: 0.8, weight: 4.0, race: 'Abissínio' },
    ];

    return { cats };
  }

  genId(cats: Cat[]): number {
    return cats.length > 0 ? Math.max(...cats.map((cats) => cats.id)) + 1 : 11;
  }
}
