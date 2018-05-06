import { Component, OnInit } from '@angular/core';
import { SpinnerChaceService } from './spinner-chace.service';

@Component({
  selector: 'app-small-rectangles-spinner',
  template: `<div class="sk-cube-grid">
              <div *ngFor="let num of nums" [ngStyle]="styles" class="sk-cube sk-cube{{num}}"></div>
            </div>`,
  styles: [`.sk-cube-grid {
              width: 40px;
              height: 40px;
              margin: 100px auto;
            }

            .sk-cube-grid .sk-cube {
              width: 33%;
              height: 33%;
              float: left;
              -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
                      animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
            }

            .sk-cube-grid .sk-cube1 {
              -webkit-animation-delay: 0.2s;
                      animation-delay: 0.2s; }
            .sk-cube-grid .sk-cube2 {
              -webkit-animation-delay: 0.3s;
                      animation-delay: 0.3s; }
            .sk-cube-grid .sk-cube3 {
              -webkit-animation-delay: 0.4s;
                      animation-delay: 0.4s; }
            .sk-cube-grid .sk-cube4 {
              -webkit-animation-delay: 0.1s;
                      animation-delay: 0.1s; }
            .sk-cube-grid .sk-cube5 {
              -webkit-animation-delay: 0.2s;
                      animation-delay: 0.2s; }
            .sk-cube-grid .sk-cube6 {
              -webkit-animation-delay: 0.3s;
                      animation-delay: 0.3s; }
            .sk-cube-grid .sk-cube7 {
              -webkit-animation-delay: 0s;
                      animation-delay: 0s; }
            .sk-cube-grid .sk-cube8 {
              -webkit-animation-delay: 0.1s;
                      animation-delay: 0.1s; }
            .sk-cube-grid .sk-cube9 {
              -webkit-animation-delay: 0.2s;
                      animation-delay: 0.2s; }

            @-webkit-keyframes sk-cubeGridScaleDelay {
              0%, 70%, 100% {
                -webkit-transform: scale3D(1, 1, 1);
                        transform: scale3D(1, 1, 1);
              } 35% {
                -webkit-transform: scale3D(0, 0, 1);
                        transform: scale3D(0, 0, 1);
              }
            }

            @keyframes sk-cubeGridScaleDelay {
              0%, 70%, 100% {
                -webkit-transform: scale3D(1, 1, 1);
                        transform: scale3D(1, 1, 1);
              } 35% {
                -webkit-transform: scale3D(0, 0, 1);
                        transform: scale3D(0, 0, 1);
              }
            }`
  ],
})
export class SmallRectanglesSpinnerComponent implements OnInit {

  public styles;
  public nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private spinnerChace: SpinnerChaceService) { }

  ngOnInit() {
    this.styles = {
      'background-color': this.spinnerChace.color,
    };
  }

}
