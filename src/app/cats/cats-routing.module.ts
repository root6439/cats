import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchCatsComponent } from './search-cats/search-cats.component';
import { NewCatComponent } from './new-cat/new-cat.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'search', component: SearchCatsComponent },
  { path: 'new', component: NewCatComponent },
  { path: 'edit/:id', component: NewCatComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatsRoutingModule {}
