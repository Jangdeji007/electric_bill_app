import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private http:HttpClient) { }
  basUrl:String="http://localhost:4040"
  token = localStorage.getItem('token');
  applicantRegister(registerData:any)
  {
    return this.http.post(`${this.basUrl}/public/register`,registerData,{withCredentials: true });
  }
  applicantLogin(payload:any)
  {
      return this.http.post(`${this.basUrl}/auth/login`,payload,{withCredentials: true })
  }


  getApplicantDetails(email:any)
  {
    console.log(this.token)
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)  // Add your token or any header
    .set('Content-Type', 'application/json'); // Ensure it's application/json

  const options = {
    headers: headers,
   // withCredentials: true,  // Ensure credentials are included (e.g., cookies)
  };
  console.log(options)
    return this.http.post(`http://localhost:4040/applicant/getDetails`,{email},options,)
  }
}
