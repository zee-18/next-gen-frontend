import { TestBed } from '@angular/core/testing';

import { AiPoweredService } from './ai-powered.service';

describe('AiPoweredService', () => {
  let service: AiPoweredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiPoweredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
