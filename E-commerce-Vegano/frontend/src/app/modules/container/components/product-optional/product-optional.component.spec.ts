import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOptionalComponent } from './product-optional.component';

describe('ProductOptionalComponent', () => {
  let component: ProductOptionalComponent;
  let fixture: ComponentFixture<ProductOptionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOptionalComponent]
    });
    fixture = TestBed.createComponent(ProductOptionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
