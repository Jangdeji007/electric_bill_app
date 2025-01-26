import { Address } from './../consumer/applicant-register2/applicant-Model';
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
    return this.http.get(`${this.basUrl}/applicant/details?email=${email}`)
  }


  saveApplicant(applicantData: any, aadhaarFile: File, rashanCardFile: File, photoFile: File){

    const formData: FormData = new FormData();

    // Append applicant data as JSON string (or as individual fields if necessary)
    formData.append('applicant', JSON.stringify(applicantData));

    // Append files to the FormData
    formData.append('aadhaarFile', aadhaarFile, aadhaarFile.name);
    formData.append('rashanCardFile', rashanCardFile, rashanCardFile.name);
    formData.append('photoFile', photoFile, photoFile.name);
    console.log(formData)
    return  this.http.post(`${this.basUrl}/applicant/save`,formData, {withCredentials: true });
  }

  saveAddress(address:any, email:any)
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = { email }; // Add email as a query parameter
    return this.http.post<any>(`${this.basUrl}/applicant/saveAddress`, address, { headers, params });
  }

  saveTermCondition(payload:any, email:any)
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = { email }; // Add email as a query parameter
    return this.http.post<any>(`${this.basUrl}/applicant/termCondition`,payload,{ headers, params });
  }

  checkStatus(registerId:any)
  {
    return this.http.get(`${this.basUrl}/public/checkstatus?status=${registerId}`);
  }

}
