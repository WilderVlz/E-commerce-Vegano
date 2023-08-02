import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCounterProductOptionalComponent } from './button-counter-product-optional.component';

describe('ButtonCounterProductOptionalComponent', () => {
  let component: ButtonCounterProductOptionalComponent;
  let fixture: ComponentFixture<ButtonCounterProductOptionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonCounterProductOptionalComponent]
    });
    fixture = TestBed.createComponent(ButtonCounterProductOptionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
