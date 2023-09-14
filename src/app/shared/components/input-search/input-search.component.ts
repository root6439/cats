import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject, debounceTime, filter, take } from 'rxjs';

@Component({
  selector: 'input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent implements OnInit {
  searchControl = new FormControl<string>(null, [Validators.minLength(3)]);

  searchSub = new Subject<string>();

  onSearch = new EventEmitter<string>();

  ngOnInit(): void {
    this.setSubject();
  }

  setSubject(): void {
    this.searchSub
      .pipe(
        debounceTime(400),
        filter((value: string) => value.length == 0 || value.length > 3),
        take(1)
      )
      .subscribe((value: string) => this.onSearch.emit(value));
  }
}
