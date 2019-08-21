import { TestBed } from '@angular/core/testing';

import { ManageServicesService } from './manage-services.service';

describe('ManageServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageServicesService = TestBed.get(ManageServicesService);
    expect(service).toBeTruthy();
  });
});
