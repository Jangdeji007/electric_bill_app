import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfConvertComponent } from './pdf-convert.component';

describe('PdfConvertComponent', () => {
  let component: PdfConvertComponent;
  let fixture: ComponentFixture<PdfConvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfConvertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfConvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
