import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfConvertService {

  constructor() { }
  private pdfDataSource = new Subject<any>();

  // Observable stream to listen for changes in PDF data
  pdfData$ = this.pdfDataSource.asObservable();

  // Method to send form data to pdfConvert component
  sendPdfData(data: any) {
    this.pdfDataSource.next(data);
  }
}
