import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  listData:any[] =[
  ]

  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.http.get("jsonData/Data.json").subscribe((data:any)=>
    {
      this.listData=data;
      console.log(this.listData)
    })

  }

}
