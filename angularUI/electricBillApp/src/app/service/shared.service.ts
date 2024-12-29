import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private dataSubject:any;


  setData(data: any): void {
    this.dataSubject=data;
  }

  getData(): any {
    return this.dataSubject;
  }
}
