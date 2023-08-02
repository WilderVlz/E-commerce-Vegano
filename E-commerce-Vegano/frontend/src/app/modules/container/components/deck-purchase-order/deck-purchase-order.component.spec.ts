import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckPurchaseOrderComponent } from './deck-purchase-order.component';

describe('DeckPurchaseOrderComponent', () => {
  let component: DeckPurchaseOrderComponent;
  let fixture: ComponentFixture<DeckPurchaseOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeckPurchaseOrderComponent]
    });
    fixture = TestBed.createComponent(DeckPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
