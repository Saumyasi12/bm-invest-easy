import { TestBed } from '@angular/core/testing';

import { EncryptdataService } from './encryptdata.service';

describe('EncryptdataService', () => {
  let service: EncryptdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
