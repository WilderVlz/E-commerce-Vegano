import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMobileComponent } from './footer-mobile.component';

describe('FooterMobileComponent', () => {
  let component: FooterMobileComponent;
  let fixture: ComponentFixture<FooterMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterMobileComponent]
    });
    fixture = TestBed.createComponent(FooterMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
