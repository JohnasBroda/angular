import { Subscription } from 'rxjs/Subscription';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { CustomValidators } from '../../login-form-component/validators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit, OnDestroy {

  public product;
  public amount = 1;
  public amountGroup: FormGroup;
  public dialogSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private cartSvc: CartService,
    private fb: FormBuilder) {
      this.product = this.data.product;
    }

  ngOnInit() {
    this.dialogSub = this.dialogRef.backdropClick().subscribe();
    this.amountGroup = this.fb.group({
      productAmount: [ this.amount, CustomValidators.mustBeNumberValidator],
    });
  }

  public dialogClose(amount = this.amount) {
    if (amount) {
      const productToCart = Object.assign({}, this.product, { inCart: amount });
      this.cartSvc.addProduct(productToCart);
      this.dialogRef.close(productToCart);
    } else {
      this.dialogRef.close();
    }
  }

  public increaseAmount() {
    this.amount++;
    this.amountGroup.get('productAmount').setValue(this.amount);
  }

  public decreaseAmount() {
    if (this.amount > 1) {
      this.amount--;
      this.amountGroup.get('productAmount').setValue(this.amount);
    }
  }

  ngOnDestroy() {
    this.dialogSub.unsubscribe();
  }

}
