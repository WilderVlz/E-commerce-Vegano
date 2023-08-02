import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionProductoComponent } from './descripcion-producto.component';

describe('DescripcionProductoComponent', () => {
  let component: DescripcionProductoComponent;
  let fixture: ComponentFixture<DescripcionProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescripcionProductoComponent]
    });
    fixture = TestBed.createComponent(DescripcionProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
