import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchUsersComponent } from './search-users/search-users.component';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [
  { path: 'search', component: SearchUsersComponent },
  { path: 'new', component: NewUserComponent },
  { path: 'edit/:id', component: NewUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
