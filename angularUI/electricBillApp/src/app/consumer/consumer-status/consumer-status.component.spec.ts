import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerStatusComponent } from './consumer-status.component';

describe('ConsumerStatusComponent', () => {
  let component: ConsumerStatusComponent;
  let fixture: ComponentFixture<ConsumerStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
