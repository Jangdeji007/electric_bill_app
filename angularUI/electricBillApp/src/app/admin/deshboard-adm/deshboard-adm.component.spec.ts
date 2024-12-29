import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeshboardAdmComponent } from './deshboard-adm.component';

describe('DeshboardAdmComponent', () => {
  let component: DeshboardAdmComponent;
  let fixture: ComponentFixture<DeshboardAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeshboardAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeshboardAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
