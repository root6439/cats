import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchCatsComponent } from './search-cats/search-cats.component';
import { NewCatComponent } from './new-cat/new-cat.component';

const routes: Routes = [
  { path: 'search', component: SearchCatsComponent },
  { path: 'new', component: NewCatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatsRoutingModule {}
