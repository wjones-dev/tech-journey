import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Museum } from './museum';

describe('Museum', () => {
  let component: Museum;
  let fixture: ComponentFixture<Museum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Museum],
    }).compileComponents();

    fixture = TestBed.createComponent(Museum);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
