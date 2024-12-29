import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private http:HttpClient) { }
  basUrl:String="http://localhost:4040"
  applicantRegister(registerData:any)
  {
    return this.http.post(`${this.basUrl}/auth/register`,registerData,{withCredentials: true });
  }
  applicantLogin(payload:any)
  {
      if(payload.userId=="karan@gmail.com" && payload.password=="Pass@123")
      {
        return true;
      }
      else{
        return false;
      }
  }
}
