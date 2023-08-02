import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckMenuComponent } from './deck-menu.component';

describe('DeckComponent', () => {
  let component: DeckMenuComponent;
  let fixture: ComponentFixture<DeckMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeckMenuComponent]
    });
    fixture = TestBed.createComponent(DeckMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
