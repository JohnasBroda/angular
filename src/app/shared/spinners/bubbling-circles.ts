import { Component, OnInit } from '@angular/core';
import { SpinnerChaceService } from './spinner-chace.service';

@Component({
  selector: 'app-bubbling-circles-spinner',
  template: `<div class="spinner">
              <div class="double-bounce1" [ngStyle]="styles"></div>
              <div class="double-bounce2" [ngStyle]="styles"></div>
            </div>`,
  styles: [`.spinner {
    width: 40px;
    height: 40px;
    position: relative;
    margin: 100px auto;
  }
  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
    animation: sk-bounce 2.0s infinite ease-in-out;
  }
  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
  @-webkit-keyframes sk-bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }
  @keyframes sk-bounce {
    0%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }`],
})
export class BubblingCirclesSpinnerComponent implements OnInit {

  public styles;

  constructor(private spinnerChace: SpinnerChaceService) { }

  ngOnInit() {
    this.styles = {
      'background-color': this.spinnerChace.color,
    };
  }

}
