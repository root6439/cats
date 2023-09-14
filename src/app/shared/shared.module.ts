import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DialogExitPageComponent } from './components/dialog-exit-page/dialog-exit-page.component';
import { DialogGenericComponent } from './components/dialog-generic/dialog-generic.component';
import { RacePipe } from './pipes/race.pipe';
import { WeightPipe } from './pipes/weight.pipe';
import { LengthPipe } from './pipes/length.pipe';
import { CustomValidators } from './validators/date.validator';
import { GenderPipe } from './pipes/gender.pipe';
import { CpfPipe } from './pipes/cpf.pipe';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    DialogExitPageComponent,
    DialogGenericComponent,
    RacePipe,
    WeightPipe,
    LengthPipe,
    GenderPipe,
    CpfPipe,
    InputSearchComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    RacePipe,
    WeightPipe,
    LengthPipe,
    GenderPipe,
    CpfPipe,
    InputSearchComponent,
  ],
})
export class SharedModule {}
