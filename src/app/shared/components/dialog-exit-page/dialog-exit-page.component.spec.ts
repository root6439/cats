import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExitPageComponent } from './dialog-exit-page.component';

describe('DialogExitPageComponent', () => {
  let component: DialogExitPageComponent;
  let fixture: ComponentFixture<DialogExitPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogExitPageComponent]
    });
    fixture = TestBed.createComponent(DialogExitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
