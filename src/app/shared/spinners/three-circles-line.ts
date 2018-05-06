import { Component, OnInit, InjectionToken, Inject, forwardRef } from '@angular/core';
import { SpinnerChaceService } from './spinner-chace.service';
export class ColorChace {
  public static color: string;
}


@Component({
  selector: 'app-three-circles-line-spinner',
  template: `<div class="spinner">
              <div *ngFor="let num of nums" [ngStyle]="styles" class="bounce{{num}}"></div>
             </div>`,
  styles: [`.spinner {
              width: 70px;
              text-align: center;
            }

            .spinner > div {
              width: 18px;
              height: 18px;
              border-radius: 100%;
              display: inline-block;
              -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
              animation: sk-bouncedelay 1.4s infinite ease-in-out both;
            }

            .spinner .bounce1 {
              -webkit-animation-delay: -0.32s;
              animation-delay: -0.32s;
            }

            .spinner .bounce2 {
              -webkit-animation-delay: -0.16s;
              animation-delay: -0.16s;
            }

            @-webkit-keyframes sk-bouncedelay {
              0%, 80%, 100% { -webkit-transform: scale(0) }
              40% { -webkit-transform: scale(1.0) }
            }

            @keyframes sk-bouncedelay {
              0%, 80%, 100% {
                -webkit-transform: scale(0);
                transform: scale(0);
              } 40% {
                -webkit-transform: scale(1.0);
                transform: scale(1.0);
              }
            }`
  ],
})
export class ThreeCirclesLineSpinnerComponent implements OnInit {

  public styles;
  public nums = [1, 2, 3];

  constructor(private spinnerChace: SpinnerChaceService) { }

  ngOnInit() {
    this.styles = {
      'background-color': this.spinnerChace.color,
    };
  }

}
