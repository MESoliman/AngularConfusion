import { TestBed } from '@angular/core/testing';

import { ProcessHTTPmsgService } from './process-httpmsg.service';

describe('ProcessHTTPmsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessHTTPmsgService = TestBed.get(ProcessHTTPmsgService);
    expect(service).toBeTruthy();
  });
});
