import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { AddToCartComponent } from '../../cart/add-to-cart/add-to-cart.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { AngularFireStorage } from 'angularfire2/storage';
import { Product } from '@store/products';
import { IUser } from '@store/user/model';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('product') product: Product;
  // tslint:disable-next-line:no-output-rename
  @Input() currentUser: IUser;
  // tslint:disable-next-line:no-output-rename
  @Output('select') prodcutToInspect = new EventEmitter<Product>();
  // tslint:disable-next-line:no-output-rename
  @Output('edit') productToEdit = new EventEmitter<Product>();

  public addToCartDialogRef: MatDialogRef<any>;

  constructor(
    public dialog: MatDialog,
    private storage: AngularFireStorage) { }

  ngOnInit() {}

  public inspect(product) {
    this.prodcutToInspect.emit(product);
  }

  public edit(product) {
    this.productToEdit.emit(product);
  }

  public addToCart(product: Product) {
    const config: MatDialogConfig = {
      closeOnNavigation: true,
      autoFocus: true,
      ariaLabel: 'addToCartDialog',
      data: { product },
      disableClose: false,
      hasBackdrop: true,
    };
    this.addToCartDialogRef = this.dialog.open(AddToCartComponent, config);
  }
}
