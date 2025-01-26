import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, EmailValidator } from '@angular/forms';
import { AdminLoginService } from '../../service/admin-login.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {



  login: FormGroup;
    alertMessage: string = '';
    alertType: string = '';
    showAlert: boolean = false;
    constructor(private fb:FormBuilder, private admService:AdminLoginService, private router:Router){
      this.login= this.fb.group({
        email:["",[Validators.required, Validators.email]],
        password:["",Validators.required]
      });
    }
    onSubmit() {
      if (this.login.valid) {
        this.admService.loginUser(this.login.value).subscribe({
          next:(res: any) => {
            if (res.jwtToken) {
              this.admService.setToken(res.jwtToken);
              localStorage.setItem("role", res.roles[0]); // Store the user's role
              if (res.roles[0] === "ROLE_USER") {
                this.alertMessage = "Login successful!";
                this.alertType = "success";
                // setTimeout(() => (window.location.href = "register"), 2000);
                setTimeout(()=>{
                  this.router.navigate(['/register'], { queryParams: { email: res.email } })
                },2000)
              } else if (res.roles[0] === "ROLE_ADMIN") {
                this.alertMessage = "Login successful!";
                this.alertType = "success";
                setTimeout(() => (window.location.href = "admin"), 2000);
              } else {
                this.alertMessage = "Invalid Role!";
                this.alertType = "danger";
              }
            } else {
              this.alertMessage = "User ID and password incorrect. Please login again!";
              this.alertType = "danger";
            }
            this.showAlert = true;
            setTimeout(() => (this.showAlert = false), 3000);
          },
          error: (err) => {
            const errorMessage = err.error?.message || "An unexpected error occurred!";
            this.alertMessage = errorMessage;
            this.alertType = "danger";
            this.showAlert = true;
            console.error('Error during login:', errorMessage);
            setTimeout(() => (this.showAlert = false), 3000);
          }
        });
      } else {
        this.alertMessage = "Please fill in the User ID and Password.";
        this.alertType = "warning";
        this.showAlert = true;
        this.login.markAllAsTouched();
        setTimeout(() => (this.showAlert = false), 3000);
      }
    }

    isInvalid(controlName:string)
    {
      const control= this.login.get(controlName);

      return control?.invalid && (control?.dirty || control.touched);
    }
}
