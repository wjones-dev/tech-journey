import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Napster } from './napster';

describe('Napster', () => {
  let component: Napster;
  let fixture: ComponentFixture<Napster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Napster],
    }).compileComponents();

    fixture = TestBed.createComponent(Napster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
