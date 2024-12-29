import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantRegister2Component } from './applicant-register2.component';

describe('ApplicantRegister2Component', () => {
  let component: ApplicantRegister2Component;
  let fixture: ComponentFixture<ApplicantRegister2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantRegister2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantRegister2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
