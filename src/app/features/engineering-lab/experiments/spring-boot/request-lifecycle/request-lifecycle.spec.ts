import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLifecycle } from './request-lifecycle';

describe('RequestLifecycle', () => {
  let component: RequestLifecycle;
  let fixture: ComponentFixture<RequestLifecycle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestLifecycle],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestLifecycle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
