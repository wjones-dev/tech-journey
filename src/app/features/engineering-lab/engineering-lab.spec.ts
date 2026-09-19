import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineeringLab } from './engineering-lab';

describe('EngineeringLab', () => {
  let component: EngineeringLab;
  let fixture: ComponentFixture<EngineeringLab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineeringLab],
    }).compileComponents();

    fixture = TestBed.createComponent(EngineeringLab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
