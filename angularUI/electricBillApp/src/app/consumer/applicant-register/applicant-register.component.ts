import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicantService } from '../../service/applicant.service';
import { OtpService } from '../../service/otp.service';


@Component({
  selector: 'app-applicant-register',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './applicant-register.component.html',
  styleUrl: './applicant-register.component.css'
})
export class ApplicantRegisterComponent{

  registrationForm: FormGroup;
  otpSent: boolean = false;
  otpVerified: boolean = false;
  constructor(private fb: FormBuilder, private registerService:ApplicantService, private otpService:OtpService) {
    this.registrationForm = this.fb.group({
      connectionType: ['LT', Validators.required], // Default value with validation
      otp: ['', Validators.required], // ✅ Add this line for OTP field
      userId: ['', Validators.required], // Required field
      email: ['', [Validators.required, Validators.email]], // Required and valid email
      mobile: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)], // 10-digit mobile number
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6)], // Minimum 6 characters
      ],
      confirmPassword: ['', Validators.required], // Required field
    },
    {
      validator: this.passwordMatchValidator, // Custom validator for matching passwords
    });
  }

  // Custom validator for matching passwords
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Check if a control is invalid
  isInvalid(controlName: string) {
    const control = this.registrationForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  sendOtp(): void {
    const email = this.registrationForm.value.email;
      this.otpService.sentOtp(email).subscribe({
        next:(res)=>{
          this.otpSent = true;
          alert('OTP Sent Successfully!');
        },error:(err)=>console.log("AAA",err)
      })
  }

  verifyOtp(): void {
    const email = this.registrationForm.value.email;
    const otp = this.registrationForm.value.otp;
    const payload={
      email:this.registrationForm.value.email,
      otp: this.registrationForm.value.otp
    }
    this.otpService.verifyOtp(payload).subscribe({
      next:(res:any)=>{
        if (res.valid) {
          this.otpVerified = true;
          alert('OTP Verified Successfully!');
        } else {
          alert('Invalid OTP. Please try again.');
        }
      },error:(err)=>console.log("BBB",err)
    })
  }

  // Handle form submission
  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Submitted Successfully:', this.registrationForm.value);
      const payLoad = {
        userId: this.registrationForm.get("userId")?.value,
        connectionType: this.registrationForm.get("connectionType")?.value,
        email: this.registrationForm.get("email")?.value,
        mobile: this.registrationForm.get("mobile")?.value,
        password: this.registrationForm.get("password")?.value,
      };
      console.log(payLoad);
      // Check if the form is valid before submitting
      if (this.registrationForm.valid) {
        this.registerService.applicantRegister(payLoad).subscribe({
          next: (res) => {
            alert("Registration successful!");
            this.registrationForm.reset(); // Reset the form after successful registration
          },
          error: (err) => {
            console.error("Registration failed: ", err);
            alert("Registration failed. Please try again.");
          },
        });
      } else {
        alert("Please fill out all required fields correctly.");
        this.registrationForm.markAllAsTouched(); // Highlight invalid fields
      }

    } else {
      console.error('Form is invalid!');
    }
  }


}
