import { ApplicantDetails } from './applicant-Model';
import { ApplicantService } from './../../service/applicant.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SharedService } from './../../service/shared.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicant-register2',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './applicant-register2.component.html',
  styleUrl: './applicant-register2.component.css'
})

export class ApplicantRegister2Component {

  appliDetails:ApplicantDetails|null=null;
  formCount:number=0;
  currentStep = 1;
  districts: any;
  selectedDistrictBlocks: string[] = [];
  firstFormGroup!: FormGroup;
  addressForm!: FormGroup;
  termsForm!: FormGroup;
  block: any;
  userEmail:String='';

  constructor(private fb: FormBuilder, private shereData: SharedService, private http: HttpClient,private activeRoute:ActivatedRoute, private appService: ApplicantService) {
    this.activeRoute.queryParams.subscribe(params => {
      this.userEmail = params['email'];
      console.log(params['email']);

      // Fetch applicant details
      this.appService.getApplicantDetails(this.userEmail).subscribe((res: any) => {
        this.appliDetails = res;

        // Initialize the form after data is loaded
        this.getFirstForm(fb);
      });
    });

    // this.getFirstForm(fb);
    this.getDistrict();
    this.getAddressData(fb);
    this.getTermCondition(fb);

  }

  getTermCondition(fb: FormBuilder) {
    this.termsForm = fb.group({
      terms: [false, Validators.requiredTrue]
    })

  }
  getFirstForm(fb: FormBuilder)
  {
    this.firstFormGroup = fb.group({
      connectionType: [this.appliDetails?.connectionType, Validators.required],
      title: [this.appliDetails?.title, Validators.required],
      firstName: [this.appliDetails?.firstName, Validators.required],
      lastName: [this.appliDetails?.lastName, Validators.required],
      email: [this.appliDetails?.email, [Validators.required, Validators.email]],
      dob: [this.appliDetails?.dob, Validators.required],
      gender: [this.appliDetails?.gender, Validators.required],
      category: [this.appliDetails?.category, Validators.required],
      mobile: [this.appliDetails?.mobile, [Validators.required, Validators.pattern('[0-9]{10}')]],
      aadhaar: [this.appliDetails?.aadhaarCardNo, [Validators.required, Validators.pattern('[0-9]{12}')]],
      userId: [this.appliDetails?.userId, Validators.required],
      aadhaarFile: [this.appliDetails?.aadhaarCardPhoto, [Validators.required, this.fileSizeValidator]],
      rashanCard: [this.appliDetails?.rashanCardPhoto, [Validators.required, this.fileSizeValidator]],
      photo: [this.appliDetails?.applicantPhoto, [Validators.required, this.fileSizeValidator]],

    });
  }
  getAddressData(fb: FormBuilder) {
    this.addressForm = fb.group({
      district: ["", Validators.required],
      localaty: ['', Validators.required],
      block: ['', Validators.required],
      address: ['', Validators.required],
      house: ['', Validators.required],
      street: ['', Validators.required],
      calony: ['', Validators.required],
      pincode: ['', Validators.required]

    });
    this.selectedDistrictBlocks = [];
    this.addressForm.controls['district'].valueChanges.subscribe(selectedDistrict => {
      this.updateBlocks(selectedDistrict);
    });
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


  onFileChange(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.firstFormGroup.patchValue({
        [controlName]: input.files[0],
      });
    }
  }


  getDistrict() {
    this.http.get("jsonData/District.json").subscribe((data: any) => {
      this.districts = data;
      console.log(this.districts)
    })
  }

  onSubmit() {

    this.firstFormGroup.markAllAsTouched();
    if (this.firstFormGroup.valid) {
      this.formCount++;
      console.log(this.firstFormGroup.value);
      this.currentStep = 2;
      return;
    }

  }
  onSubmit2() {
    this.addressForm.markAllAsTouched();
    console.log(this.addressForm.value);
    if (this.addressForm.valid) {
      console.log(this.addressForm.value)
      this.currentStep = 3;
      this.formCount++;
      return;
    }

  }
  submit() {
    console.log(this.termsForm)
    this.termsForm.markAllAsTouched(); // Mark all fields as touched to show validation messages

    if (this.termsForm.valid) {
      alert('Form submitted successfully!');
      this.formCount++;
      return ;
    }
    alert("please accept terms Condition")

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
  DataInfo = {
    name: "karan",
    email: "l@gmail.com",
    userId: "karan123",
    mobile: "6295340221"
  }
}

