import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchMenuComponent } from './input-search-menu.component';

describe('InputSearchMenuComponent', () => {
  let component: InputSearchMenuComponent;
  let fixture: ComponentFixture<InputSearchMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputSearchMenuComponent]
    });
    fixture = TestBed.createComponent(InputSearchMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
