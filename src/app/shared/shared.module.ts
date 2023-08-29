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

@NgModule({
  declarations: [
    PageNotFoundComponent,
    DialogExitPageComponent,
    DialogGenericComponent,
    RacePipe,
    WeightPipe,
    LengthPipe,
  ],
  imports: [CommonModule, MatButtonModule, RouterModule],
  exports: [RacePipe, WeightPipe, LengthPipe],
})
export class SharedModule {}
