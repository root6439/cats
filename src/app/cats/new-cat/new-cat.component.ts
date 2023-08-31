import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cat } from 'src/app/shared/models/Cat.model';
import { CatService } from '../cat.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogExitPageComponent } from 'src/app/shared/components/dialog-exit-page/dialog-exit-page.component';
import { Race } from 'src/app/shared/models/Race';
import { CustomValidators } from 'src/app/shared/validators/date.validator';
import { DialogGenericComponent } from 'src/app/shared/components/dialog-generic/dialog-generic.component';

@Component({
  selector: 'app-new-cat',
  templateUrl: './new-cat.component.html',
  styleUrls: ['./new-cat.component.scss'],
})
export class NewCatComponent implements OnInit, OnDestroy {
  formCat = new FormGroup({
    name: new FormControl<string>(null, Validators.required),
    length: new FormControl<number>(null, [
      Validators.required,
      Validators.min(0.1),
    ]),
    weight: new FormControl<number>(null, [
      Validators.required,
      Validators.min(0.1),
    ]),
    races: new FormControl<Race[]>(null, [
      Validators.required,
      Validators.maxLength(2),
    ]),
    birth: new FormControl<Date>(null, [
      Validators.required,
      CustomValidators.isValidDate,
    ]),
    gender: new FormControl<'M' | 'F'>(null, [Validators.required]),
  });

  catId: number;
  editMode = false;
  selectedCat: Cat;
  canExit = false;
  races: Race[] = [];

  serviceSub = new Subscription();
  dialogRefSub = new Subscription();

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

  ngOnDestroy(): void {
    this.serviceSub.unsubscribe();
    this.dialogRefSub.unsubscribe();
  }

  verifyRoute(): void {
    if (this.route.routeConfig.path.includes('edit')) {
      this.editMode = true;
      this.catId = this.route.snapshot.params['id'];
      this.getCatById();
    } else {
      this.getRaces();
    }
  }

  getCatById(): void {
    this.serviceSub = this.service.getCatById(this.catId).subscribe((resp) => {
      this.fillForm(resp);
      this.races = resp.races;
    });
  }

  getRaces(): void {
    this.serviceSub = this.service.getRaces().subscribe((resp) => {
      this.races = resp;
    });
  }

  fillForm(cat: Cat): void {
    this.formCat.patchValue({ ...cat });
    this.formCat.get('races').disable();
    this.formCat.get('birth').disable();
    this.formCat.get('gender').disable();
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
    this.canExit = true;
    let message = 'Gato cadastrado';

    if (name) {
      message = `Gato ${name} atualizado!`;
    }

    this.router.navigate(['/cats/search']).then((value) => {
      if (value) {
        this.toastService.success(message, 'Sucesso!');
      }
    });
  }

  back(): void {
    this.router.navigate(['/cats/search'], { queryParamsHandling: 'preserve' });
  }

  openDialog(): Promise<boolean> {
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(DialogGenericComponent, {
        data: {
          title: 'Deseja mesmo sair?',
          description: 'Você possui alterações que não foram salvas.',
          labelButton: 'Sair',
        },
      });

      this.dialogRefSub = dialogRef
        .afterClosed()
        .subscribe((result: boolean) => {
          resolve(result);
        });
    });
  }

  resetForm(): void {
    if (this.editMode) {
      this.formCat.get('name').reset();
      this.formCat.get('length').reset();
      this.formCat.get('weight').reset();
    } else {
      this.formCat.reset();
    }
  }

  compareRaces(r1: Race, r2: Race) {
    return r1?.id == r2?.id;
  }
}
