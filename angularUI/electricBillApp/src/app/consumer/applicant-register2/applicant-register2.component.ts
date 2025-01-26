import { ApplicantDetails, Address, Documents } from './applicant-Model';
import { ApplicantService } from './../../service/applicant.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as bootstrap from 'bootstrap'; // Ensure this is imported
import { AdminLoginService } from '../../service/admin-login.service';
import autoTable from 'jspdf-autotable';
import { PdfConvertService } from '../../service/pdf-convert.service';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-applicant-register2',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
],
  providers: [DatePipe],
  templateUrl: './applicant-register2.component.html',
  styleUrl: './applicant-register2.component.css'
})

export class ApplicantRegister2Component {

  appliDetails: ApplicantDetails | null = null;
  selectedAadhaarFile: File | null = null;
  selectedRashanCardFile: File | null = null;
  selectedPhotoFile: File | null = null;
  formCount: number = 0;
  currentStep = 1;
  districts: any;
  selectedDistrictBlocks: string[] = [];
  firstFormGroup!: FormGroup;
  addressForm!: FormGroup;
  termsForm!: FormGroup;
  block: any;
  userEmail: String = '';
  addressDetails: Address | null = null;
  documents: any[] = [{}, {}, {}];
  registrationId:any;
  modalInstance: bootstrap.Modal | undefined; // Variable to store the modal instance
  minDate:string='';
  constructor(private fb: FormBuilder, private http: HttpClient,
    private route: ActivatedRoute, private appService: ApplicantService,
     private datePipe: DatePipe,private modalService: BsModalService,
    private adm:AdminLoginService, private pdfService:PdfConvertService) {
    this.minDate = '2004-01-01';
    this.getDetails();
    this.getFirstForm(fb);
    this.getDistrict();
    this.getAddressData(fb);
    this.getTermCondition(fb);

  }

  getDetails() {
    this.route.queryParams.subscribe(params => {
      console.log(params); // Logs all query parameters as an object
      this.userEmail = params['email']; // Retrieve the 'email' query parameter
      console.log('Email:', this.userEmail);
    });
    this.appService.getApplicantDetails(this.userEmail).subscribe({
      next: (res: any) => {
        if(res.status=="submited"){
          alert("you have alrady Registered please check your status")
          this.adm.userLogout();
          window.location.href = '/home';
          return;
        }
        if (res) {
          this.appliDetails = res;
          this.documents=res.documents || [];
          console.log(this.appliDetails);
          // Populate form with API response
          this.firstFormGroup.patchValue({
            connectionType: this.appliDetails?.connectionType || '',
            title: this.appliDetails?.title || '',
            firstName: this.appliDetails?.firstName || '',
            lastName: this.appliDetails?.lastName || '',
            email: this.appliDetails?.email || '',
            dob: this.datePipe.transform(this.appliDetails?.dob, 'yyyy-MM-dd') || '',
            gender: this.appliDetails?.gender || '',
            category: this.appliDetails?.category || '',
            mobile: this.appliDetails?.mobile || '',
            aadhaarCardNo: this.appliDetails?.aadhaarCardNo || '',
            userId: this.appliDetails?.userId || '',
            documents: this.appliDetails?.document||''
          });
          this.addressForm.patchValue({
            townVillage: this.appliDetails?.address?.townVillage || "",
            block: this.appliDetails?.address?.block || "",
            address: this.appliDetails?.address?.address || "",
            housePlotPremiseNo: this.appliDetails?.address?.housePlotPremiseNo || "",
            street: this.appliDetails?.address?.street || "",
            areaColony: this.appliDetails?.address?.areaColony || "",
            pincode: this.appliDetails?.address?.pincode || "",
          });

        }
      },
      error: (err) => {
        alert("Your session has expired. Please log in again.")
        console.error('Error fetching applicant details:', err);
        window.location.href = "/login"
      }
    });

  }
  decodeBase64(base64Str: string): string {
    return 'data:image/jpeg/pdf;base64,' + base64Str; // Adjust MIME type as needed (e.g., image/png)
  }

  getFirstForm(fb: FormBuilder) {
    this.firstFormGroup = fb.group({
      connectionType: ['', Validators.required],
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      category: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      aadhaarCardNo: ['', [Validators.required, Validators.pattern('[0-9]{12}')]],
      userId: ['', Validators.required],
      aadhaarCardPhoto: ['', [Validators.required, this.fileSizeValidator]],
      rashanCardPhoto: ['', [Validators.required, this.fileSizeValidator]],
      applicantPhoto: ['', [Validators.required, this.fileSizeValidator]],
    });
  }

  getAddressData(fb: FormBuilder) {

    this.addressForm = fb.group({
      district: ["", Validators.required],
      townVillage: ['', Validators.required],
      block: ['', Validators.required],
      address: ['', Validators.required],
      housePlotPremiseNo: ['', Validators.required],
      street: ["", Validators.required],
      areaColony: ['', Validators.required],
      pincode: ['', Validators.required]

    });
    this.selectedDistrictBlocks = [];
    this.addressForm.controls['district'].valueChanges.subscribe(selectedDistrict => {
      this.updateBlocks(selectedDistrict);
    });
  }
  getTermCondition(fb: FormBuilder) {
    this.termsForm = fb.group({
      terms: [false, Validators.requiredTrue]
    })
  }
  isAllFormsValid(): boolean {
     return this.firstFormGroup.valid && this.addressForm.valid && this.termsForm.valid;
  }
  openPopup() {
    if (this.isAllFormsValid()) {
      this.pdfService.sendPdfData(this.appliDetails);
      this.appService.saveTermCondition("submited",this.userEmail).subscribe({
        next:(res:any)=>{
          this.registrationId=res.registerId;
        },error:(err)=>console.log("Error factching data",err)
      })
      const modalElement = document.getElementById('confirmationModal');
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
        this.modalInstance.show();
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }

  closePopup()
  {
    if(this.modalInstance)
    {
      this.modalInstance.hide();
      window.location.href='';
    }
  }


  viewFormData() {
    this.currentStep = 1; // Navigate back to the first step
  }
  updateBlocks(selectedDistrict: string) {
    console.log(selectedDistrict);

    const district = this.districts.find((d: any) => d.district === selectedDistrict);
    // Update the filteredBlocks array
    this.selectedDistrictBlocks = district ? district.blocks : [];

    this.addressForm.controls['block'].setValue('');
  }

  fileSizeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const file = control.value as File;
    if (file && file.size > 200 * 1024) { // 200 KB
      return { fileSize: true };
    }
    return null;
  }


  onAadhaarFileChange(event: any) {
    this.selectedAadhaarFile = event.target.files[0];
  }

  onRashanCardFileChange(event: any) {
    this.selectedRashanCardFile = event.target.files[0];
  }

  onPhotoFileChange(event: any) {
    this.selectedPhotoFile = event.target.files[0];
  }


  getDistrict() {
    this.http.get("jsonData/District.json").subscribe((data: any) => {
      this.districts = data;
      console.log(this.districts)
    })
  }
  onSubmit() {
    this.firstFormGroup.markAllAsTouched();
    if (this.firstFormGroup.valid && this.selectedAadhaarFile && this.selectedRashanCardFile && this.selectedPhotoFile) {
      if (this.firstFormGroup.valid) {
        const payload = {
          connectionType: this.firstFormGroup.controls["connectionType"].value,
          title: this.firstFormGroup.controls["title"].value,
          firstName: this.firstFormGroup.controls["firstName"].value,
          lastName: this.firstFormGroup.controls["lastName"].value,
          email: this.firstFormGroup.controls["email"].value,
          dob: this.firstFormGroup.controls["dob"].value,
          gender: this.firstFormGroup.controls["gender"].value,
          category: this.firstFormGroup.controls["category"].value,
          mobile: this.firstFormGroup.controls["mobile"].value,
          aadhaarCardNo: this.firstFormGroup.controls["aadhaarCardNo"].value,
          userId: this.firstFormGroup.controls["userId"].value,
          status:"panding",
        }
        // Call the service to save applicant data including files
        this.appService.saveApplicant(payload, this.selectedAadhaarFile, this.selectedRashanCardFile, this.selectedPhotoFile).subscribe(
          (response:any) => {
            alert('Applicant data saved successfully');
            this.formCount++;
            console.log(this.firstFormGroup.value);
            this.currentStep = 2;
          },
          error => {
            console.error('Error saving applicant', error);
          }
        );
      }
    }
  }
  onSubmit2() {
    this.addressForm.markAllAsTouched();
    console.log(this.addressForm.value);
    if (this.addressForm.valid) {
      const address = this.addressForm.value;
      this.appService.saveAddress(address, this.userEmail).subscribe({
        next: (res: any) => {
          if (res.status == "failed") {
            alert("Data base error");
          } else {
            alert("Address saved successfully")
            this.currentStep = 3;
            this.formCount++;
          }
        },
        error: (err) => {
          alert("Addrss not submit")
          console.error('Error fetching applicant details:', err);
        }
      })

      return;
    }

  }

  setStep(step: number) {
    this.currentStep = step;
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  generatePDF() {
    console.log("Generating Registration Form PDF...");

    const doc = new jsPDF();

    // **Header Section**
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text('CSPDL New Connection Application Form', 50, 15);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Application Status: ${this.appliDetails?.status}`, 150, 25);

    let yOffset = 35;

    // **Applicant Details Section**
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text('Applicant Details', 10, yOffset);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    yOffset += 8;

    doc.text(`Name: ${this.appliDetails?.title} ${this.appliDetails?.firstName} ${this.appliDetails?.lastName}`, 10, yOffset);
    doc.text(`Date of Birth: ${this.appliDetails?.dob}`, 10, yOffset + 8);
    doc.text(`Gender: ${this.appliDetails?.gender}`, 10, yOffset + 16);
    doc.text(`Mobile No: ${this.appliDetails?.mobile}`, 10, yOffset + 24);
    doc.text(`Email: ${this.appliDetails?.email}`, 10, yOffset + 32);
    doc.text(`Connection Type: ${this.appliDetails?.connectionType}`, 10, yOffset + 40);
    doc.text(`Aadhaar No: ${this.appliDetails?.aadhaarCardNo}`, 10, yOffset + 48);
    doc.text(`Category: ${this.appliDetails?.category}`, 10, yOffset + 56);

    yOffset += 70;

    // **Applicant Photo (if available)**
    if (this.appliDetails?.document) {
      let imageData = `data:image/jpeg;base64,${this.appliDetails.document?.content}`;
      doc.addImage(imageData, 'JPEG', 140, 35, 50, 50); // Adjust position & size
    }

    // **Address Details Table**
    yOffset += 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text('Address Details', 10, yOffset);

    yOffset += 5;

    autoTable(doc, {
      startY: yOffset + 5,
      head: [['House No', 'Street', 'Colony', 'Town/Village', 'District', 'Block', 'Pincode']],
      body: [[this.appliDetails?.address.housePlotPremiseNo||'', this.appliDetails?.address?.street||'', this.appliDetails?.address?.areaColony||'',
         this.appliDetails?.address?.townVillage||'', this.appliDetails?.address?.district||'', this.appliDetails?.address?.block||'', this.appliDetails?.address?.pincode||'',

      ]],
      theme: 'grid',
      styles: { fontSize: 10 }
    });

     yOffset = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 15 : 150;

    // **Uploaded Documents**
    if (this.documents && this.documents.length > 0) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text('Uploaded Documents:', 10, yOffset);
      yOffset += 10;

      this.documents.forEach((docItem, index) => {
        if (docItem.content) {
          let imageData = `data:${docItem.type};base64,${docItem.content}`;
          doc.text(docItem.name, 10, yOffset);
          doc.addImage(imageData, 'JPEG', 10, yOffset + 5, 40, 40); // Adjust size
          yOffset += 45;
        }
      });
    } else {
      doc.text('No Documents Uploaded', 10, yOffset);
    }

    // **Save or Open the PDF**
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank'); // Open PDF in new tab
  }


}

//this.appliDetails?.address.housePlotPremiseNo, this.appliDetails?.address?.street, this.appliDetails?.address?.areaColony,
// this.appliDetails?.address?.townVillage, this.appliDetails?.address?.district, this.appliDetails?.address?.block, this.appliDetails?.address?.pincode

