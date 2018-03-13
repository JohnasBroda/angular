import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cechkout',
  templateUrl: './cechkout.component.html',
  styleUrls: ['./cechkout.component.css']
})
export class CechkoutComponent implements OnInit {

  public totalPrice: Observable<number>;

  constructor(private cartSvc: CartService) { }

  ngOnInit() {
    this.totalPrice = this.cartSvc.totalPrice;
  }
}
