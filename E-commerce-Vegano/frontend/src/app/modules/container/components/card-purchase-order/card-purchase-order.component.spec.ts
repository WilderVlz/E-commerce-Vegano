import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPurchaseOrderComponent } from './card-purchase-order.component';

describe('CardPurchaseOrderComponent', () => {
  let component: CardPurchaseOrderComponent;
  let fixture: ComponentFixture<CardPurchaseOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPurchaseOrderComponent]
    });
    fixture = TestBed.createComponent(CardPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
