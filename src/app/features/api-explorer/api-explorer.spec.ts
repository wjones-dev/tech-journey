import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('ApiExplorer', () => {
  let component: ApiExplorer;
  let fixture: ComponentFixture<ApiExplorer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiExplorer],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiExplorer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
