import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private http:HttpClient) { }
  baseUrl="localhost:4040";
  isLogedIn:boolean=false;
  loginUser(payload:any)
  {

    return this.http.post(`http://localhost:4040/auth/login`,payload, {withCredentials: true })

  }
  setToken(token:any)
  {
    localStorage.setItem("token",token)
    return true
  }
  isLogedin()
  {
    let token= localStorage.getItem("token");
    if(token== undefined || token== null || token=="")
    {
      return false;
    }
    else{
      return true;
    }
  }
  userLogout()
  {
    localStorage.removeItem("token");
    return true
  }

  getUSer()
  {
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.getToken()}`)  // Add your token or any header

  const options = {
    headers: headers,
   // withCredentials: true,  // Ensure credentials are included (e.g., cookies)
  };
  console.log(options)
    return this.http.get(`http://localhost:4040/home/admin`,options)
  }

  getToken()
  {
    return localStorage.getItem("token");
  }
}
