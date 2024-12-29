import { Routes } from '@angular/router';
import { DeshboardComponent } from './consumer/deshboard/deshboard.component';
import { DeshboardAdmComponent } from './admin/deshboard-adm/deshboard-adm.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './service/auth.guard';
import { HomeComponent } from './home/home/home.component';
import { AboutComponent } from './home/about/about.component';
import { BoardOfdirectorsComponent } from './home/board-ofdirectors/board-ofdirectors.component';
import { ApplicantRegisterComponent } from './consumer/applicant-register/applicant-register.component';
import { ApplicantLoginComponent } from './consumer/applicant-login/applicant-login.component';
import { ApplicantRegister2Component } from './consumer/applicant-register2/applicant-register2.component';

export const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"board_of_directors", component:BoardOfdirectorsComponent},
  {path:"applicant-Register",component:ApplicantRegisterComponent},
  {path:"Applicant_Login", component: ApplicantLoginComponent},
  {path:"register",component:ApplicantRegister2Component, },
  {path:"about_cspdl",component:AboutComponent},

  {path:"login", component:LoginComponent},
  {path:"admin",
    component: DeshboardAdmComponent,
    canActivate: [authGuard]
  },
  {path:"consumer", component: DeshboardComponent,
    canActivate: [authGuard]
  },
  {path:"**", redirectTo:""}
];

