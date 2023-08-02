import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFilterMenuComponent } from './button-filter-menu.component';

describe('ButtonFilterMenuComponent', () => {
  let component: ButtonFilterMenuComponent;
  let fixture: ComponentFixture<ButtonFilterMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonFilterMenuComponent]
    });
    fixture = TestBed.createComponent(ButtonFilterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
