import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringRequestLifecycle } from './spring-request-lifecycle';

describe('SpringRequestLifecycle', () => {
  let component: SpringRequestLifecycle;
  let fixture: ComponentFixture<SpringRequestLifecycle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpringRequestLifecycle],
    }).compileComponents();

    fixture = TestBed.createComponent(SpringRequestLifecycle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
