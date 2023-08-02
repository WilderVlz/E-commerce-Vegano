import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCounterComponent } from './button-counter.component';

describe('ButtonCounterComponent', () => {
  let component: ButtonCounterComponent;
  let fixture: ComponentFixture<ButtonCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonCounterComponent]
    });
    fixture = TestBed.createComponent(ButtonCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
