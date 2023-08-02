import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryContainerComponent } from './delivery-container.component';

describe('DeliveryContainerComponent', () => {
  let component: DeliveryContainerComponent;
  let fixture: ComponentFixture<DeliveryContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryContainerComponent]
    });
    fixture = TestBed.createComponent(DeliveryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
