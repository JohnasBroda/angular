import { Component, OnInit } from '@angular/core';
import { SpinnerChaceService } from './spinner-chace.service';

@Component({
  selector: 'app-grwoing-circles-spinner',
  template: `<div class="spinner">
              <div *ngFor="let num of nums" [ngStyle]="styles" class="dot{{num}}"></div>
            </div>`,
  styles: [`.spinner {
              margin: 100px auto;
              width: 40px;
              height: 40px;
              position: relative;
              text-align: center;
              -webkit-animation: sk-rotate 2.0s infinite linear;
              animation: sk-rotate 2.0s infinite linear;
            }
            .dot1, .dot2 {
              width: 60%;
              height: 60%;
              display: inline-block;
              position: absolute;
              top: 0;
              border-radius: 100%;
              -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
              animation: sk-bounce 2.0s infinite ease-in-out;
            }
            .dot2 {
              top: auto;
              bottom: 0;
              -webkit-animation-delay: -1.0s;
              animation-delay: -1.0s;
            }
            @-webkit-keyframes sk-rotate { 100% { -webkit-transform: rotate(360deg) }}
            @keyframes sk-rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}
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
            }`
  ],
})
export class GrwoingCirclesSpinnerComponent implements OnInit {

  public nums = [1, 2];
  public styles;

  constructor(private spinnerChace: SpinnerChaceService) { }

  ngOnInit() {
    this.styles = {
      'background-color': this.spinnerChace.color,
    };
  }
}
