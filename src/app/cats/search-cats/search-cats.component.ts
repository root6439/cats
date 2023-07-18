import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatService } from '../cat.service';
import { Cat } from 'src/app/shared/models/Cat.model';
import { Subject, Subscription, debounceTime, filter, take } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-cats',
  templateUrl: './search-cats.component.html',
  styleUrls: ['./search-cats.component.scss'],
})
export class SearchCatsComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'length', 'weight', 'race', 'actions'];

  dataSource: Cat[] = [];

  serviceSub = new Subscription();

  searchControl = new FormControl<string>('', Validators.minLength(3));

  subject = new Subject<string>();

  constructor(
    private service: CatService,
    private toastService: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCats();
    this.setConfigSubject();
    this.getSearchQueryParams();

    this.searchControl.valueChanges
      .pipe(debounceTime(1000), take(1))
      .subscribe((value) => {
        this.searchControl.markAsTouched();
      });
  }

  ngOnDestroy(): void {
    this.serviceSub.unsubscribe();
  }

  getCats(searchValue: string = ''): void {
    this.serviceSub = this.service.getCats(searchValue).subscribe((resp) => {
      this.dataSource = resp;
    });
  }

  setConfigSubject(): void {
    this.subject
      .pipe(
        debounceTime(1000),
        filter((value) => value.length >= 3 || value == '')
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

  getSearchQueryParams(): void {
    let searchValue: string = this.route.snapshot.queryParams['search'];
    this.searchControl.setValue(searchValue);
    this.getCats(searchValue);
  }
}
