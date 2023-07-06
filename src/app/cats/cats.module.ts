import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCatComponent } from './new-cat/new-cat.component';
import { SearchCatsComponent } from './search-cats/search-cats.component';
import { CatsRoutingModule } from './cats-routing.module';

@NgModule({
  declarations: [NewCatComponent, SearchCatsComponent],
  imports: [CommonModule, CatsRoutingModule],
  providers: [],
})
export class CatsModule {}
