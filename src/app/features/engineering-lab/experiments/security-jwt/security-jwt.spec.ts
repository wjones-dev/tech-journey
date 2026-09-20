import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityJwt } from './security-jwt';

describe('SecurityJwt', () => {
  let component: SecurityJwt;
  let fixture: ComponentFixture<SecurityJwt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityJwt],
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityJwt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
