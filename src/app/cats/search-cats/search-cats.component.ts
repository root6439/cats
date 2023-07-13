import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatService } from '../cat.service';
import { Cat } from 'src/app/shared/models/Cat.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-cats',
  templateUrl: './search-cats.component.html',
  styleUrls: ['./search-cats.component.scss'],
})
export class SearchCatsComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'length', 'weight', 'race', 'actions'];

  dataSource: Cat[] = [];

  serviceSub = new Subscription();

  constructor(private service: CatService) {}

  ngOnInit(): void {
    this.serviceSub = this.service.getCats().subscribe((resp) => {
      this.dataSource = resp;
    });
  }

  ngOnDestroy(): void {
    this.serviceSub.unsubscribe();
  }
}
