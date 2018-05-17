import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductImageComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('urls') images: string[];

  public imgIndex: number;
  // tslint:disable-next-line:no-inferrable-types
  public showImgBtns: boolean = false;

  constructor() { }

  ngOnInit() {
    this.imgIndex = 0;
  }

  public showPrevImg() {
    this.imgIndex === 0 ?
    this.imgIndex = this.images.length - 1 : this.imgIndex--;
  }

  public showNextImg() {
    this.imgIndex === this.images.length - 1 ?
    this.imgIndex = 0 : this.imgIndex++;
  }
}
