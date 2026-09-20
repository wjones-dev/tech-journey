import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTechnology } from './lab-technology';

describe('LabTechnology', () => {
  let component: LabTechnology;
  let fixture: ComponentFixture<LabTechnology>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabTechnology],
    }).compileComponents();

    fixture = TestBed.createComponent(LabTechnology);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
