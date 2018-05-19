import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-product-in-cart-card',
  templateUrl: './product-in-cart-card.component.html',
  styleUrls: ['./product-in-cart-card.component.css']
})
export class ProductInCartCardComponent implements OnInit {

  // tslint:disable-next-line:no-output-rename
  @Output('remove') public removeProduct = new EventEmitter<any>();
  @Input() public product;

  public imgIndex: number;
  // tslint:disable-next-line:no-inferrable-types
  public imgBtnsVisible: boolean = false;

  constructor() { }

  public ngOnInit() {
    this.imgIndex = 0;
  }

  public remove(product) {
    this.removeProduct.emit(product);
  }

  public inspect(product) {

  }

  public showPrevImg() {
    this.imgIndex === 0 ?
      this.imgIndex = this.product.images.length - 1 : this.imgIndex--;
  }

  public showNextImg() {
    this.imgIndex === this.product.images.length - 1 ?
      this.imgIndex = 0 : this.imgIndex++;
  }
}
