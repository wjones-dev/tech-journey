import { TestBed } from '@angular/core/testing';
import { TimelineApiService } from '../../core/services/timeline-api.service';

describe('TimelineApi', () => {
  let service: TimelineApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
