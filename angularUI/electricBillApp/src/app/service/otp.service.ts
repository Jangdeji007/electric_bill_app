import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private http:HttpClient) { }
    basUrl:String="http://localhost:4040"

    sentOtp(email:any)
    {
      return this.http.get(`${this.basUrl}/public/send?email=${email}`);
    }

    verifyOtp(payload:any)
    {
      console.log(payload);
      return this.http.post(`${this.basUrl}/public/verify`,payload);
    }
}
