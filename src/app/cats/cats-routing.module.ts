import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchCatsComponent } from './search-cats/search-cats.component';
import { NewCatComponent } from './new-cat/new-cat.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { canDeactivateGuard } from '../shared/guards/cat/cat-guard.service';

const routes: Routes = [
  {
    path: 'search',
    component: SearchCatsComponent,
    data: { animation: '1' },
  },
  {
    path: 'new',
    component: NewCatComponent,
    canDeactivate: [canDeactivateGuard],
    data: { animation: '2' },
  },
  {
    path: 'edit/:id',
    component: NewCatComponent,
    canDeactivate: [canDeactivateGuard],
    data: { animation: '2' },
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatsRoutingModule {}
