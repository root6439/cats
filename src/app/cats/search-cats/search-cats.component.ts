import { Component, OnInit } from '@angular/core';
import { CatService } from '../cat.service';

@Component({
  selector: 'app-search-cats',
  templateUrl: './search-cats.component.html',
  styleUrls: ['./search-cats.component.scss'],
})
export class SearchCatsComponent implements OnInit {
  constructor(private service: CatService) {}

  ngOnInit(): void {
    this.service.getCats().subscribe((resp) => {
      console.log(resp);
    });
  }
}
