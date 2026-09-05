import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBuild } from './about-build';

describe('AboutBuild', () => {
  let component: AboutBuild;
  let fixture: ComponentFixture<AboutBuild>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutBuild],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutBuild);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
