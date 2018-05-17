import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FireDbService } from '../../../services/fire-db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { IProduct } from '@store/products';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductComponent implements OnInit {

  public product: IProduct;
  public editForm: FormGroup;
  public categories: string[] = ['PS4', 'PS3', 'XBOX ONE', 'XBOX 360', 'Android', 'Apple'];
  public subCategories: string[] = ['Controllers', ];

  constructor(
    private db: FireDbService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
      this.editForm = this.fb.group({
        amount: [null, [
          Validators.required,
          Validators.min(0)]
        ],
        category: [null, [Validators.required, ]],
        color: [null, [Validators.required, ] ],
        name: [null, [Validators.required, ]],
        price: [null, [Validators.required, ]],
        size: [null, [Validators.required, ]],
        subCategory: [null, [Validators.required, ]]
      });
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const productName = params.get('productName');
      this.db.getProductByName(productName).then((product: IProduct) => {
        this.product = product;
        console.log(this.product.subCategory);
        this.editForm.reset({
          amount: this.product.amount,
          category: this.product.category,
          color: this.product.color,
          name: this.product.name,
          price: this.product.price,
          size: this.product.size,
          subCategory: this.product.subCategory
        });
      });
    });
  }

  public saveChanges() {

  }

  get amount() {
    return this.editForm.get('amount');
  }
  get category() {
    return this.editForm.get('category');
  }
  get color() {
    return this.editForm.get('color');
  }
  get name() {
    return this.editForm.get('name');
  }
  get price() {
    return this.editForm.get('price');
  }
  get size() {
    return this.editForm.get('size');
  }
  get subCategory() {
    return this.editForm.get('subCategory');
  }

}
