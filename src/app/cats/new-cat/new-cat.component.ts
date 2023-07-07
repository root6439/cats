import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    name: new FormControl(),
    length: new FormControl(),
    weight: new FormControl(),
    race: new FormControl(),
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.formCat);
    
    if (this.route.routeConfig.path.includes('edit')) {
      let id = this.route.snapshot.params['id'];
      let cat = this.dataSource.find((item) => item.id == id);
      console.log(cat);
    }
  }
}
