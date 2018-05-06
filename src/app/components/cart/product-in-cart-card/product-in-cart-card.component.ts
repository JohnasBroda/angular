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

  constructor() { }

  ngOnInit() {}

  public remove(product) {
    this.removeProduct.emit(product);
  }

  public inspect(product) {

  }
}
