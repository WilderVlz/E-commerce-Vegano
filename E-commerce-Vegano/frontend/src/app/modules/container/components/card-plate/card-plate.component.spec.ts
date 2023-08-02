import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPlateMenuComponent } from './card-plate.menu.component';

describe('CardComponent', () => {
  let component: CardPlateMenuComponent;
  let fixture: ComponentFixture<CardPlateMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPlateMenuComponent]
    });
    fixture = TestBed.createComponent(CardPlateMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
