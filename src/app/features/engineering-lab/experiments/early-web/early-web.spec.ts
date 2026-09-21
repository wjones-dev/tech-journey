import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlyWeb } from './early-web';

describe('EarlyWeb', () => {
  let component: EarlyWeb;
  let fixture: ComponentFixture<EarlyWeb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarlyWeb],
    }).compileComponents();

    fixture = TestBed.createComponent(EarlyWeb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
