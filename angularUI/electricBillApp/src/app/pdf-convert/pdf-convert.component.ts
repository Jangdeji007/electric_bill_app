
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ApplicantDetails } from '../consumer/applicant-register2/applicant-Model';
import { ActivatedRoute, Route } from '@angular/router';
import { ApplicantService } from '../service/applicant.service';
@Component({
  selector: 'app-pdf-convert',
  imports: [],
  templateUrl: './pdf-convert.component.html',
  styleUrl: './pdf-convert.component.css'
})
export class PdfConvertComponent {
 appliDetails: ApplicantDetails | null = null;
 userEmail:string='';
  constructor(private http: HttpClient, private route:ActivatedRoute, private appservice:ApplicantService) {}

  fetchDataAndGeneratePDF() {
    this.route.queryParams.subscribe(params => {
      console.log(params); // Logs all query parameters as an object
      this.userEmail = params['email']; // Retrieve the 'email' query parameter
      console.log('Email:', this.userEmail);
    });
    this.appservice.getApplicantDetails(this.userEmail).subscribe({
      next:(res:any)=>{
       this.generatePDF(res);
      },error: (err)=>console.log("err11",err)
    })
  }
  decodeBase64(base64Str: string): string {
    return 'data:image/jpeg/pdf;base64,' + base64Str; // Adjust MIME type as needed (e.g., image/png)
  }
  generatePDF(data: ApplicantDetails) {

    const doc = new jsPDF();

    // Add Header
    doc.setFontSize(18);
    doc.text('CSPDL New Connection Application Form', 50, 20);

    // Add Consumer Details
    doc.setFontSize(12);
    doc.text(`Consumer Name: ${data.title} ${data?.firstName} ${data.lastName}`, 20, 40);
    doc.text(`Date Of Birth: ${ data?.dob}}`, 20, 50);
    doc.text(`Aadhar Card No: ${data?.aadhaarCardNo}`, 20, 60);
    doc.text(`Service Type: ${data?.connectionType}`, 20, 70);

    // Add Address Details
    doc.text(`House No: ${data?.address.housePlotPremiseNo}`, 20, 90);
    doc.text(`Street: ${data?.address.street}`, 20, 100);
    doc.text(`District: ${data?.address.district}`, 20, 110);
    doc.text(`State: Chhattisarh`, 20, 120);
    doc.text(`Pin Code: ${data?.address.pincode}`, 20, 130);
    doc.text(`Mobile No: ${data?.mobile}`, 20, 140);

    // Add Table for Additional Details
    autoTable(doc, {
      startY: 150,
      head: [['Informant Name', 'Relation', 'Delivery Type']],
      body: [[data?.document?.name, data?.document?.type, this.decodeBase64(data?.document?.content)]]
    });

    // Save the PDF
    doc.save('CSPDL_New_Connection_Form.pdf');
  }
}
