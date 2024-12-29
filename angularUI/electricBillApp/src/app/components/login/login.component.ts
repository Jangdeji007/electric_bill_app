import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginService } from '../../service/admin-login.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  users:any[]= [];
  headerToken:HttpHeaders= new HttpHeaders;
  constructor(private fb: FormBuilder, private loginService:AdminLoginService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted:', this.loginForm.value);
      const payload= this.loginForm.value;
      this.loginService.generateToken(payload).subscribe((result:any)=>
      {
       const token=result.jwtToken;
        this.loginService.userLogin(token);
       alert("login Sucess")
       window.location.href="/admin"
      }, Error=>console.log(Error));
    }
  }

 
}
