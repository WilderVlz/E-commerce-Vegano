import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModalPlateDetailsComponent } from './card-modal-plate-details.component';

describe('ProductDetailsModalComponent', () => {
  let component: CardModalPlateDetailsComponent;
  let fixture: ComponentFixture<CardModalPlateDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardModalPlateDetailsComponent]
    });
    fixture = TestBed.createComponent(CardModalPlateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
