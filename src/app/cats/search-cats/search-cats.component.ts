import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatService } from '../cat.service';
import { Cat } from 'src/app/shared/models/Cat.model';
import { Subject, Subscription, debounceTime, filter, take } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-cats',
  templateUrl: './search-cats.component.html',
  styleUrls: ['./search-cats.component.scss'],
})
export class SearchCatsComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'length', 'weight', 'race', 'actions'];

  dataSource: Cat[] = [];

  serviceSub = new Subscription();

  searchControl = new FormControl<string>('');

  subject = new Subject<string>();

  constructor(
    private service: CatService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCats();
    this.setConfigSubject();
  }

  getCats(searchValue: string = ''): void {
    this.serviceSub = this.service.getCats(searchValue).subscribe((resp) => {
      this.dataSource = resp;
    });
  }

  setConfigSubject(): void {
    this.subject
      .pipe(
        debounceTime(1000)
        // filter((value) => value.length > 3 || value == '')
      )
      .subscribe((searchValue: string) => {
        this.getCats(searchValue);
      });
  }

  searchCats(searchValue: string): void {
    this.subject.next(searchValue);
  }

  deleteCat(id: number): void {
    this.service
      .deleteCat(id)
      .pipe(take(1))
      .subscribe(() => {
        this.toastService.success('Sucesso!', 'Gato removido');
        this.getCats(this.searchControl.value);
      });
  }

  ngOnDestroy(): void {
    this.serviceSub.unsubscribe();
  }
}
