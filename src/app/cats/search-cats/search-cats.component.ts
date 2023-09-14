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
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-search-cats',
  templateUrl: './search-cats.component.html',
  styleUrls: ['./search-cats.component.scss'],
})
export class SearchCatsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['name', 'length', 'weight', 'races', 'gender', 'actions'];

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

  ngOnInit(): void {
    this.setConfigSubject();
    this.getSearchQueryParams();

    this.searchControl.valueChanges
      .pipe(debounceTime(1000), take(1))
      .subscribe((value) => {
        this.searchControl.markAsTouched();
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.serviceSub.unsubscribe();
  }

  getCats(
    searchValue: string = '',
    page: number = 0,
    offset: number = 5
  ): void {
    this.serviceSub = this.service
      .getCats(searchValue, page + 1, offset)
      .subscribe((resp) => {
        this.dataSource = new MatTableDataSource(resp.data);
        this.paginator.length = resp.totalElements;
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
        labelButton: 'Excluir',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.deleteCat(cat.id);
        }
      });
  }

  deleteCat(id: string): void {
    this.service
      .deleteCat(id)
      .pipe(take(1))
      .subscribe((value) => {
        this.toastService.success('Gato removido', 'Sucesso!');
        this.getCats(this.searchControl.value);
      });
  }

  getSearchQueryParams(): void {
    let searchValue: string = this.route.snapshot.queryParams['search'];
    this.searchControl.setValue(searchValue);
    this.getCats(searchValue);
  }
}
