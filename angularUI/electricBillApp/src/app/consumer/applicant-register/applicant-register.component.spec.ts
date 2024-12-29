import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantRegisterComponent } from './applicant-register.component';

describe('ApplicantRegisterComponent', () => {
  let component: ApplicantRegisterComponent;
  let fixture: ComponentFixture<ApplicantRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
