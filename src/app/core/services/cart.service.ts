import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { repeatWhen, repeat, scan, multicast, last } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CartService {

  public products: any[] = [];
  public amountInCart: BehaviorSubject<number> = new BehaviorSubject(0);
  public changeEvent: BehaviorSubject<any[]> = new BehaviorSubject(this.products);
  public totalPrice: BehaviorSubject<number> = new BehaviorSubject(0);
  private productsInCart = 'productsInCart';
  public productsReference: string[] = [];

  constructor() {
    this.getProducts();
  }

  public getProducts() {
    if (this.products.length) {
      this.notify();
    } else {
      const storedRef = localStorage.getItem(this.productsInCart);
      if (storedRef) {
        const reference = JSON.parse(storedRef);
        reference.forEach(element => {
          const productString = localStorage.getItem(element);
          const product = JSON.parse(productString);
          this.products.push(product);
        });
      }
      this.notify();
    }
  }

  public addProduct(product) {
    let i = this.products.findIndex(x => x.id === product.id);
    console.log(i);
    if (i !== -1) {
      this.products[i].inCart += product.inCart;
    } else {
      this.products.push(product);
      i = this.products.length - 1;
      this.productsReference.push('inCart-' + product.id);
      localStorage.setItem(this.productsInCart, JSON.stringify(this.productsReference));
    }
    localStorage.setItem(`inCart-${product.id}`, JSON.stringify(this.products[i]));
    this.notify();
  }

  public emptyCart() {
    this.products.forEach(x => {
      localStorage.removeItem('inCart-' + x.name);
    });
    localStorage.removeItem(this.productsInCart);
    this.products = [];
    this.notify();
  }

  public removeProduct(product) {
    const i = this.products.findIndex(x => x.id === product.id);
    if (this.products[i].inCart > 1) {
      this.products[i].inCart--;
      console.log(this.products[i]);
    } else {
      localStorage.removeItem('inCart-' + this.products[i].id);
      this.products.splice(i, 1);
      const productsRef = localStorage.getItem(this.productsInCart);
      const storedProducts: string[] = JSON.parse(productsRef);
      const newRef = storedProducts.filter(item => item !== 'inCart-' + product.id);
      console.log(newRef);
      if (newRef.length) {
        localStorage.setItem(this.productsInCart, JSON.stringify(newRef));
      } else {
        localStorage.removeItem(this.productsInCart);
      }
    }
    this.notify();
  }

  private notify() {
    const amount = this.products.reduce((acc, curr) => acc + curr.inCart, 0);
    const totalPrice = this.products.reduce((acc, curr) => acc + curr.price, 0);
    this.changeEvent.next(this.products);
    this.amountInCart.next(amount);
    this.totalPrice.next(totalPrice);
  }
}
