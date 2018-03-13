import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CechkoutComponent } from './cechkout.component';

describe('CechkoutComponent', () => {
  let component: CechkoutComponent;
  let fixture: ComponentFixture<CechkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CechkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CechkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
