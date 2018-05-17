import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-product-in-cart-card',
  templateUrl: './product-in-cart-card.component.html',
  styleUrls: ['./product-in-cart-card.component.css']
})
export class ProductInCartCardComponent implements OnInit {

  // tslint:disable-next-line:no-output-rename
  @Output('remove') removeProduct = new EventEmitter<any>();
  @Input() product;

  public imgIndex: number;
  // tslint:disable-next-line:no-inferrable-types
  public imgBtnsVisible: boolean = false;

  constructor() { }

  ngOnInit() {
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
