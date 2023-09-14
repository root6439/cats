import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/shared/models/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss'],
})
export class SearchUsersComponent implements OnInit {
  searchControl = new FormControl<string>('');
  displayedColumns: string[] = ['id', 'name', 'email', 'cpf', 'actions'];

  dataSource = new MatTableDataSource<User>();

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.getUsers().subscribe((resp) => {
      this.dataSource = new MatTableDataSource(resp);
    });
  }

  search(search: string): void {}

  openDialogDeleteUser(user: User): void {}
}
