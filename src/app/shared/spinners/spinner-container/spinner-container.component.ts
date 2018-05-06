import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  ComponentRef } from '@angular/core';
import { ContentChild } from '@angular/core/src/metadata/di';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { SpinnerChaceService,
         SpinnerDisplayMode,
         SpinnerSize } from 'app/shared/spinners/spinner-chace.service';
import { BarsSpinnerComponent } from 'app/shared/spinners/bars';
import { BubblingCirclesSpinnerComponent } from 'app/shared/spinners/bubbling-circles';
import { FadingCircleSpinnerComponent } from 'app/shared/spinners/fading-circle';
import { FoldingRectanglesSpinnerComponent } from 'app/shared/spinners/folding-rectangles';
import { FlippingRectangleSpinnerComponent } from 'app/shared/spinners/flipping-rectangle';
import { GrwoingCirclesSpinnerComponent } from 'app/shared/spinners/growing-circles';
import { RectanglesSpinnerComponent } from 'app/shared/spinners/rectangles';
import { SmallRectanglesSpinnerComponent } from 'app/shared/spinners/small-rectangles';
import { SmallCirclesRoundSpinnerComponent } from 'app/shared/spinners/small-circles-round';
import { ThreeCirclesLineSpinnerComponent } from 'app/shared/spinners/three-circles-line';



@Component({
  selector: 'app-spinner-container',
  template: '<template #target></template>',
  providers: [SpinnerChaceService]
})
export class SpinnerContainerComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:no-input-rename
  @Input('spinner') spinnerName: string;
  // tslint:disable-next-line:no-input-rename
  @Input('delay') delay: number;
  // tslint:disable-next-line:no-input-rename
  @Input('visible') visible: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('color') color: string;
  // tslint:disable-next-line:no-input-rename
  @Input('display') display: SpinnerDisplayMode;
  // tslint:disable-next-line:no-input-rename
  @Input('size') size: SpinnerSize;

  @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;

  private componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver, private spinnerChace: SpinnerChaceService) {}

  ngOnInit() {
    this.config();
    this.target.clear();
    const spinnerComponent = this.getSpinner();
    const factory = this.resolver.resolveComponentFactory(spinnerComponent);

    setTimeout(() => {
      this.componentRef = this.target.createComponent(factory);
    }, this.delay);
  }

  ngOnDestroy() {
    this.componentRef.destroy();
   }

   private config() {
    if (this.color) {
      this.spinnerChace.color = this.color;
    }
    if (this.delay) {
      this.spinnerChace.delay = this.delay;
    }
    if (!this.visible === null || !this.visible === undefined) {
      this.spinnerChace.visible = this.visible;
    }
    if (this.size) {
      this.spinnerChace.spinnerSize = this.size;
    }
    if (this.display) {
      this.spinnerChace.displayMode = this.display;
    }
   }

  private getSpinner(): any {
    switch (this.spinnerName) {
      case 'Bars':
      {
        return BarsSpinnerComponent;
      }
      case 'BubblingCircles':
      {
        return BubblingCirclesSpinnerComponent;
      }
      case 'FadingCircle':
      {
        return FadingCircleSpinnerComponent;
      }
      case 'FoldingRectangles':
      {
        return FoldingRectanglesSpinnerComponent;
      }
      case 'FlippingRectangle':
      {
        return FlippingRectangleSpinnerComponent;
      }
      case 'GrowingCircles':
      {
        return GrwoingCirclesSpinnerComponent;
      }
      case 'RecTangles':
      {
        return RectanglesSpinnerComponent;
      }
      case 'SmallRectangles':
      {
        return SmallRectanglesSpinnerComponent;
      }
      case 'smallCirclesRound':
      {
        return SmallCirclesRoundSpinnerComponent;
      }
      case 'ThreeCirclesLine':
      {
        return ThreeCirclesLineSpinnerComponent;
      }
      default: return ThreeCirclesLineSpinnerComponent;
    }
  }
}

