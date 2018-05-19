import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastCardComponent } from './toast-card.component';

describe('ToastCardComponent', () => {
  let component: ToastCardComponent;
  let fixture: ComponentFixture<ToastCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
