import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModalOrderDetailsComponent } from './button-modal-order-details.component';

describe('ProductDetailsModalComponent', () => {
  let component: ButtonModalOrderDetailsComponent;
  let fixture: ComponentFixture<ButtonModalOrderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonModalOrderDetailsComponent]
    });
    fixture = TestBed.createComponent(ButtonModalOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
