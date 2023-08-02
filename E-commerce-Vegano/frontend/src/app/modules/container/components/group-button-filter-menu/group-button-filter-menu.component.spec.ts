import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupButtonFilterMenuComponent } from './group-button-filter-menu.component';

describe('GroupButtonFilterMenuComponent', () => {
  let component: GroupButtonFilterMenuComponent;
  let fixture: ComponentFixture<GroupButtonFilterMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupButtonFilterMenuComponent]
    });
    fixture = TestBed.createComponent(GroupButtonFilterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
