import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CatService } from '../cat.service';
import { Cat } from 'src/app/shared/models/Cat.model';
import { Subject, Subscription, debounceTime, filter, take } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/utils/Auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenericComponent } from 'src/app/shared/components/dialog-generic/dialog-generic.component';
import { MatSort } from '@angular/material/sort';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';

@Component({
  selector: 'app-search-cats',
  templateUrl: './search-cats.component.html',
  styleUrls: ['./search-cats.component.scss'],
})
export class SearchCatsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['id', 'name', 'length', 'weight', 'race', 'actions'];

  dataSource: MatTableDataSource<Cat> = new MatTableDataSource([]);

  serviceSub = new Subscription();

  searchControl = new FormControl<string>('', Validators.minLength(3));

  subject = new Subject<string>();

  constructor(
    private service: CatService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private auth: AuthService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.auth.isLoggedIn();

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
      this.dataSource = new MatTableDataSource(resp);
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

  openDialogDeleteCat(cat: Cat): void {
    const dialogRef = this.dialog.open(DialogGenericComponent, {
      data: {
        title: 'Exclusão de gato',
        description: `Deseja mesmo excluir os registros do gato ${cat.name}?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteCat(cat.id);
      }
    });
  }

  deleteCat(id: number): void {
    this.service
      .deleteCat(id)
      .pipe(take(1))
      .subscribe((value) => {
        console.log(value);

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
