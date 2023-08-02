import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectedContainerComponent } from './product-selected-container.component';

describe('ProductSelectedContainerComponent', () => {
  let component: ProductSelectedContainerComponent;
  let fixture: ComponentFixture<ProductSelectedContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSelectedContainerComponent]
    });
    fixture = TestBed.createComponent(ProductSelectedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
