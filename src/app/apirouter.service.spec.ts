import { TestBed } from '@angular/core/testing';

import { ApirouterService } from './apirouter.service';

describe('ApirouterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApirouterService = TestBed.get(ApirouterService);
    expect(service).toBeTruthy();
  });
});
