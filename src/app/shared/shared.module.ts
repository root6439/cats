import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DialogExitPageComponent } from './components/dialog-exit-page/dialog-exit-page.component';

@NgModule({
  declarations: [PageNotFoundComponent, DialogExitPageComponent],
  imports: [CommonModule, MatButtonModule, RouterModule],
})
export class SharedModule {}
