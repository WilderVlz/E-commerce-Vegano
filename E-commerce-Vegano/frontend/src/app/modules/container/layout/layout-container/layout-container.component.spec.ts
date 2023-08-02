import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutContainerComponent } from './layout-container.component';

describe('LayoutContainerComponent', () => {
  let component: LayoutContainerComponent;
  let fixture: ComponentFixture<LayoutContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutContainerComponent]
    });
    fixture = TestBed.createComponent(LayoutContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
