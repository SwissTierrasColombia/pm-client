import { TestBed } from '@angular/core/testing';

import { ParameterizationServicesService } from './parameterization-services.service';

describe('ParameterizationServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParameterizationServicesService = TestBed.get(ParameterizationServicesService);
    expect(service).toBeTruthy();
  });
});
