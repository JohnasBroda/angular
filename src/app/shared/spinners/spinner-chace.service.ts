import { Injectable } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

export enum SpinnerSize {
  tiny = 'tiny',
  small = 'small',
  medium = 'medium',
  large = 'large',
  huge = 'huge',
}

export enum SpinnerDisplayMode {
  fullScreen = 'fullscreen',
  block = 'block',
  inline = 'inline',
}

@Injectable()
export class SpinnerChaceService {

  public color = '#333';
  public delay = 0;
  public visible = true;
  public displayMode: SpinnerDisplayMode = SpinnerDisplayMode.fullScreen;
  public spinnerSize: SpinnerSize = SpinnerSize.tiny;

  constructor() {}

  public setSize() {
    switch (this.spinnerSize) {
      case SpinnerSize.tiny: {
        return {
          'height': '10%',
          'width': 'auto',
        };
      }
      case SpinnerSize.small: {
        return {
          'height': '20%',
          'width': 'auto',
        };
      }
      case SpinnerSize.medium: {
        return {
          'height': '30%',
          'width': 'auto'
        };
      }
      case SpinnerSize.large: {
        return {
          'height': '40%',
          'width': 'auto',
        };
      }
      case SpinnerSize.huge: {
        return {
          'height': '50%',
          'width': 'auto',
        };
      }
      default:
      {
        return {
          'height': '30%',
          'width': 'auto',
        };
      }
    }
  }

  public setDisplayMode() {
    switch (this.displayMode) {
      case SpinnerDisplayMode.fullScreen: {
        return {
          'margin': '40vmin',
          'display': 'block',
          'position': 'absolute',
          'top': 0,
          'left': 0,
        };
      }
      case SpinnerDisplayMode.block: {
        return {
          'display': 'block',
          'margin': 0,
        };
      }
      case SpinnerDisplayMode.inline: {
        return {
          'display': 'inline-block',
          'margin': 0,
        };
      }
      default: {
        return {
          'margin': '40vh auto',
          'display': 'block',
          'position': 'absolute',
          'top': 0,
          'left': 0,
        };
      }
    }
  }

}
