import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Atari } from './atari';

describe('Atari', () => {
  let component: Atari;
  let fixture: ComponentFixture<Atari>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Atari],
    }).compileComponents();

    fixture = TestBed.createComponent(Atari);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
