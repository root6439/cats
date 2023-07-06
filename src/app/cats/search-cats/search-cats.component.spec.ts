import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCatsComponent } from './search-cats.component';

describe('SearchCatsComponent', () => {
  let component: SearchCatsComponent;
  let fixture: ComponentFixture<SearchCatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCatsComponent]
    });
    fixture = TestBed.createComponent(SearchCatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
