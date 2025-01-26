import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ApplicantService } from '../../service/applicant.service';

@Component({
  selector: 'app-consumer-status',
  imports: [CommonModule,FormsModule],
  templateUrl: './consumer-status.component.html',
  styleUrl: './consumer-status.component.css'
})
export class ConsumerStatusComponent {

  registerNumber: string = '';
  statusMessage: string | null = null;
  status: 'success' | 'error' | null = null;
  regData:any;
  constructor(private appService:ApplicantService,) {

  }

  checkStatus() {
    this.appService.checkStatus(this.registerNumber).subscribe({
      next:(res:any)=>{
          this.status = 'success';
          this.statusMessage = 'Registration number is valid. Check your Status';
          this.regData={
            id:res.id,
            name:res.name,
            registerId:res.registerId,
            formSubmitDate:res.formSubmitDate,
            email:res.email,
            status:res.status
          }
      },
      error: (err)=> {
        this.status = 'error';
          this.statusMessage = 'Registration number is invalid or not found.';
        console.log("user RegisterId Not found",err)
      }
    })

  }
}
