import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../../../interfaces/Product';
import { ComponentType } from '@angular/cdk/overlay';
import { AddToCartComponent } from '../../cart/add-to-cart/add-to-cart.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { FireAuthService } from '../../../services/fire-auth-service.service';
import { User } from '../../../interfaces/User';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  // tslint:disable-next-line:no-output-rename
  @Input() currentUser: User;
  // tslint:disable-next-line:no-output-rename
  @Output('select') prodcutToInspect = new EventEmitter<Product>();
  // tslint:disable-next-line:no-output-rename
  @Output('edit') productToEdit = new EventEmitter<Product>();
  public addToCartDialogRef: MatDialogRef<any>;

  constructor(
    public dialog: MatDialog,
    private storage: AngularFireStorage) { }

  ngOnInit() {
  }

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

  public async getImgUrl() {
    const imgRef = this.storage.ref(`products/images/${this.product.images[0]}`);
    return await imgRef.getDownloadURL();
  }

}
