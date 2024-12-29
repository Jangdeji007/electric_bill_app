import { AdminLoginService } from './../../service/admin-login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-deshboard-adm',
  imports: [],
  templateUrl: './deshboard-adm.component.html',
  styleUrl: './deshboard-adm.component.css'
})
export class DeshboardAdmComponent {

  users:any[]=[];
  constructor(private adminService:AdminLoginService){}
  onClickbtn()
  {
    console.log("deshboard");
    this.adminService.getUSer().subscribe((user:any)=>
      {
          this.users = user;
          console.log(this.users);
      },Error=>console.log(Error))
  }
}
