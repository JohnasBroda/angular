import { Subscription } from 'rxjs';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '@services/cart.service';
import { ToastService } from '@services/utils/toast.service';
import { CustomValidators } from '@shared/validators/validators';

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
  public imgIndex: number;
  // tslint:disable-next-line:no-inferrable-types
  public imgBtnsVisible: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private cartSvc: CartService,
    private fb: FormBuilder,
    private toaster: ToastService) {
      this.product = this.data.product;
    }

  public ngOnInit() {
    this.imgIndex = 0;
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
      this.toaster.showSuccess();
    } else {
      this.dialogRef.close();
    }
  }

  public showPrevImg() {
    this.imgIndex === 0 ?
      this.imgIndex = this.product.images.length - 1 : this.imgIndex--;
  }

  public showNextImg() {
    this.imgIndex === this.product.images.length - 1 ?
      this.imgIndex = 0 : this.imgIndex++;
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

  public ngOnDestroy() {
    this.dialogSub.unsubscribe();
  }
}
