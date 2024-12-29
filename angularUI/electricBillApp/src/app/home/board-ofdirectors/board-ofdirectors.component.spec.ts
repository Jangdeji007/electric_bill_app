import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardOfdirectorsComponent } from './board-ofdirectors.component';

describe('BoardOfdirectorsComponent', () => {
  let component: BoardOfdirectorsComponent;
  let fixture: ComponentFixture<BoardOfdirectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardOfdirectorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardOfdirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
