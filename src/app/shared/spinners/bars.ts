import { Component, OnInit } from '@angular/core';
import { SpinnerChaceService } from './spinner-chace.service';

@Component({
  selector: 'app-bars-spinner',
  template: `<div class="containerStyles" [ngStyle]="containerStyles">
              <div class="spinner">
                <div *ngFor="let num of nums" [ngStyle]="styles" class="rect{{num}}"></div>
              </div>
            </div>`,
  styles: [`
  .containerStyles {
    margin: 0;
  }
  .spinner {
    margin: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 10px;
  }
  .spinner > div {
    height: 100%;
    width: 6px;
    margin: 0 2px;
    display: inline-block;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }
  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
  @-webkit-keyframes sk-stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
    20% { -webkit-transform: scaleY(1.0) }
  }
  @keyframes sk-stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }  20% {
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }`],
})
export class BarsSpinnerComponent implements OnInit {

  public nums = [1, 2, 3, 4, 5];
  public styles;
  public containerStyles = {};
  constructor(private spinnerChace: SpinnerChaceService) { }

  ngOnInit() {
    this.styles = {
      'background-color': this.spinnerChace.color,
    };
    this.containerStyles = this.spinnerChace.setDisplayMode();
    const asd = this.spinnerChace.setSize();
    this.containerStyles = {...this.containerStyles, ...asd};
    console.log(this.containerStyles);
  }
}
