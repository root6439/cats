import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cat } from 'src/app/shared/models/Cat.model';

@Component({
  selector: 'app-new-cat',
  templateUrl: './new-cat.component.html',
  styleUrls: ['./new-cat.component.scss'],
})
export class NewCatComponent implements OnInit {
  dataSource = [
    {
      id: 1,
      name: 'Cesar',
      length: 0.3,
      weight: 4.0,
      race: 'Ciamês',
    },
    {
      id: 2,
      name: 'Augusto',
      length: 0.5,
      weight: 5.0,
      race: 'Persa',
    },
    {
      id: 3,
      name: 'Ronaldo',
      length: 0.1,
      weight: 2.0,
      race: 'Burmês',
    },
    {
      id: 4,
      name: 'Gato',
      length: 0.2,
      weight: 6.0,
      race: 'Bengal',
    },
    {
      id: 5,
      name: 'Farofa',
      length: 0.8,
      weight: 10.0,
      race: 'Abissínio',
    },
  ];

  formCat = new FormGroup({
    name: new FormControl('', Validators.required),
    length: new FormControl<number | null>(null, Validators.required),
    weight: new FormControl<number | null>(null),
    race: new FormControl(''),
  });

  editMode = false;
  catId: number;
  selectedCat: Cat;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.routeConfig.path.includes('edit')) {
      this.editMode = true;
      this.catId = this.route.snapshot.params['id'];
      this.selectedCat = this.dataSource.find((item) => item.id == this.catId);

      this.formCat.patchValue({
        name: this.selectedCat.name,
        length: this.selectedCat.length,
        weight: this.selectedCat.weight,
        race: this.selectedCat.race,
      });
    }
  }

  createCat() {
    // lógica aqui
  }
}
