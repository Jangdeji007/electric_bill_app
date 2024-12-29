import { SharedService } from './../../service/shared.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApplicantService } from '../../service/applicant.service';

@Component({
  selector: 'app-applicant-login',
  imports: [RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './applicant-login.component.html',
  styleUrl: './applicant-login.component.css',
})
export class ApplicantLoginComponent {

  login: FormGroup;
  alertMessage: string = '';
  alertType: string = '';
  showAlert: boolean = false;
  constructor(private fb:FormBuilder, private appService:ApplicantService, private sharedService:SharedService){
    this.login= this.fb.group({
      userId:["",Validators.required],
      password:["",Validators.required]
    });
  }
  onSubmit()
  {
    if(this.login.valid)
    {
     const isLogin=this.appService.applicantLogin(this.login.value);
     if(isLogin)
     {
      this.showAlert = true;
      this.alertMessage = 'Login successful!';
      this.alertType = 'success';
      setTimeout(() => (window.location.href = `register`), 2000);
     }
     else{
      this.showAlert=true;
      this.alertMessage="UserId and password incorrect Login again!!! "
      this.alertType="danger"
      console.log(this.login.value);
     }


    }
    else{
      this.showAlert=true;
      this.alertMessage="please fill the UserId and Password ";
      this.alertType="warning"
      this.login.markAllAsTouched();
    }
    setTimeout(() => (this.showAlert = false), 3000);
  }
  isInvalid(controlName:string)
  {
    const control= this.login.get(controlName);

    return control?.invalid && (control?.dirty || control.touched);
  }

}
