import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaStreamExperiment } from './java-stream-experiment';

describe('JavaStreamExperiment', () => {
  let component: JavaStreamExperiment;
  let fixture: ComponentFixture<JavaStreamExperiment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JavaStreamExperiment],
    }).compileComponents();

    fixture = TestBed.createComponent(JavaStreamExperiment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
