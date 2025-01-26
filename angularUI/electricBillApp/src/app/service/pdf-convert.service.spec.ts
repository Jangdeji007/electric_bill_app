import { TestBed } from '@angular/core/testing';

import { PdfConvertService } from './pdf-convert.service';

describe('PdfConvertService', () => {
  let service: PdfConvertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfConvertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
