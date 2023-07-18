import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cat } from 'src/app/shared/models/Cat.model';
import { CatService } from '../cat.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogExitPageComponent } from 'src/app/shared/components/dialog-exit-page/dialog-exit-page.component';

@Component({
  selector: 'app-new-cat',
  templateUrl: './new-cat.component.html',
  styleUrls: ['./new-cat.component.scss'],
})
export class NewCatComponent implements OnInit {
  formCat = new FormGroup({
    name: new FormControl<string>(null, Validators.required),
    length: new FormControl<number>(null, Validators.required),
    weight: new FormControl<number>(null),
    race: new FormControl<string>(null),
  });

  catId: number;
  editMode = false;
  selectedCat: Cat;
  canExit = false;

  serviceSub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private service: CatService,
    private toastService: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.verifyRoute();
  }

  verifyRoute(): void {
    if (this.route.routeConfig.path.includes('edit')) {
      this.editMode = true;
      this.catId = this.route.snapshot.params['id'];
      this.getCatById();
    }
  }

  getCatById(): void {
    this.serviceSub = this.service.getCatById(this.catId).subscribe((resp) => {
      this.fillForm(resp);
    });
  }

  fillForm(cat: Cat): void {
    this.formCat.patchValue({ ...cat });
  }

  createCat(): void {
    this.serviceSub = this.service
      .postCat(this.formCat.getRawValue())
      .subscribe({
        next: (resp: Cat) => {
          this.redirectAndShowToast();
        },
        error: (error: HttpErrorResponse) => {
          this.showError();
        },
      });
  }

  updateCat(): void {
    this.serviceSub = this.service
      .putCat(this.catId, this.formCat.getRawValue())
      .subscribe({
        next: (resp) => {
          this.redirectAndShowToast(resp.name);
        },
        error: (error: HttpErrorResponse) => {
          this.showError();
        },
      });
  }

  showError(): void {
    this.toastService.error('Erro!', 'Não foi possível atualizar o gatinho!');
  }

  redirectAndShowToast(name?: string): void {
    let message = 'Gato cadastrado';

    if (name) {
      message = `Gato ${name} atualizado!`;
    }

    this.router.navigate(['/cats/search']).then((value) => {
      if (value) {
        this.toastService.success('Sucesso!', message);
      }
    });
  }

  back(): void {
    this.router.navigate(['/cats/search'], { queryParamsHandling: 'preserve' });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogExitPageComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log(result);

      if (result) {

      } else {
        
      }
    });
  }
}
