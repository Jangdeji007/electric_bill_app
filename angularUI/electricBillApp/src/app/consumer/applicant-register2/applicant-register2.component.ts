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

  formCount:number=0;
  currentStep = 1;
  districts: any;
  selectedDistrictBlocks: string[] = [];
  firstFormGroup: FormGroup;
  addressForm!: FormGroup;
  termsForm!: FormGroup;
  block: any;
  constructor(private fb: FormBuilder, private shereData: SharedService, private http: HttpClient) {
    this.getDistrict();

    this.getAddressData(fb);
    this.getTermCondition(fb);
    this.firstFormGroup = this.fb.group({
      connectionType: ['', Validators.required],
      title: ['', Validators.required],
      firstName: ["", Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      category: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      aadhaar: ['', [Validators.required, Validators.pattern('[0-9]{12}')]],
      userId: ['', Validators.required],
      aadhaarFile: ['', [Validators.required, this.fileSizeValidator]],
      rashanCard: ['', [Validators.required, this.fileSizeValidator]],
      photo: ['', [Validators.required, this.fileSizeValidator]],

    });

  }
  getTermCondition(fb: FormBuilder) {
    this.termsForm = fb.group({
      terms: [false, Validators.requiredTrue]
    })
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

