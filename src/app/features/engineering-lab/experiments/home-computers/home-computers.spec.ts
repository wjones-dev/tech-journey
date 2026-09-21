import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComputers } from './home-computers';

describe('HomeComputers', () => {
  let component: HomeComputers;
  let fixture: ComponentFixture<HomeComputers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComputers],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComputers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
