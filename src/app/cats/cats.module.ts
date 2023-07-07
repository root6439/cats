import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCatComponent } from './new-cat/new-cat.component';
import { SearchCatsComponent } from './search-cats/search-cats.component';
import { CatsRoutingModule } from './cats-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewCatComponent, SearchCatsComponent],
  imports: [
    CommonModule,
    CatsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class CatsModule {}
