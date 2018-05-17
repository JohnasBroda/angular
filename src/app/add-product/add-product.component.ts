import { UploadFormComponent } from './../components/upload-form/upload-form.component';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IProduct, Product } from '@store/products';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UploadService } from 'app/services/upload.service';
import { Upload } from 'app/classes/upload';
import { FormArray } from '@angular/forms/src/model';
import { error } from 'selenium-webdriver';
import { IAppState } from 'app/app.states';
import { Store } from '@ngrx/store';
import * as fromProducts from '@products/index';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [DecimalPipe],
})
export class AddProductComponent implements OnInit {

  @ViewChildren(UploadFormComponent) uploadFormControls: UploadFormComponent[];

  public form: FormGroup;
  public step = 0;
  private writeMode: 'batch' | 'oneByOne' = 'batch';
  private schema: IProduct;
  public productGroups: FormGroup[] = [];
  public categories = ['PS4', 'PS3', 'Xbox One', 'Xbx 360', 'Android', 'Iphone', 'Other'];
  public subCategories = ['Controller',
                          'Console Skin',
                          'Controller Charger',
                          'Thumbstick Grip',
                          'Controller Silicone case',
                          'Screen PRotector',
                          'Chargwer'];
  public filesToUpload: Upload[] = [];

  constructor(private fb: FormBuilder,
              private afs: AngularFirestore,
              private store: Store<IAppState>) {}

  ngOnInit() {
    this.buildForm();
  }

  public uploadProducts() {
    this.form.markAsPending();
    this.form.disable();

    this.executeProductCreation();

    this.uploadFormControls.forEach((ufc: UploadFormComponent) => ufc.clearDropZone());
    this.form.enable();
    this.form.reset();
    this.form.setErrors(null);
  }

  public onUpload(uploads: Upload[], groupIndex: string | number) {
    console.log(this.uploadFormControls);
    console.log(uploads);
    const imgUrls = uploads.map(upload => upload.url);
    this.form.get(['productsArray', groupIndex, 'images']).setValue(imgUrls);
  }

  private buildForm() {
    const group = this.createProductGroup();
    this.productGroups.push(group);
    this.form = this.fb.group({
      productsArray: this.fb.array(this.productGroups),
    });
  }

  public addProductGroup() {
    this.buildForm();
    console.log(this.productGroups);
  }

  private createProductGroup() {
    return this.fb.group({
      amount: [0, [
        Validators.required,
        Validators.min(0)]
      ],
      category: [null, [Validators.required, ]],
      color: [null, [Validators.required, ] ],
      name: [null, [Validators.required, ]],
      price: [null, [Validators.required, ]],
      size: [null, [Validators.required, ]],
      subCategory: [null, [Validators.required, ]],
      images: [[]],
      id: new FormControl({value: this.getProductId(), disabled: true}, [Validators.required]),
    });
  }

  public createProduct(index: string | number): Product {
    const newProduct = new Product();
    newProduct.name = this.form.get(['productsArray', index, 'name']).value;
    newProduct.category = this.form.get(['productsArray', index, 'category']).value;
    newProduct.subCategory = this.form.get(['productsArray', index, 'subCategory']).value;
    newProduct.color = this.form.get(['productsArray', index, 'color']).value;
    newProduct.price = this.form.get(['productsArray', index, 'price']).value;
    newProduct.size = this.form.get(['productsArray', index, 'size']).value;
    newProduct.amount = this.form.get(['productsArray', index, 'amount']).value;
    newProduct.id = this.form.get(['productsArray', index, 'id']).value;
    newProduct.images = this.form.get(['productsArray', index, 'images']).value;
    console.log(newProduct);
    return newProduct;
  }

  private executeProductCreation() {
    const productsToSave: Product[] = [];

    switch (this.writeMode) {
      case 'batch': {
        for (let i = 0; i < this.productGroups.length; i++) {
          const product = this.createProduct(i);
          productsToSave.push(product);
        }
        this.store.dispatch(new fromProducts.AddProducts(productsToSave));
        break;
      }
      case 'oneByOne': {
        for (let i = 0; i < this.productGroups.length; i++) {
          const product = this.createProduct(i);
          this.store.dispatch(new fromProducts.AddProduct(product));
        }
        break;
      }
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  private getProductId() {
    return `prod-${this.afs.createId()}`;
  }

  get amount() {
    return 'amount';
  }

  get category() {
    return 'category';
  }

  get color() {
    return 'color';
  }

  get name() {
    return 'name';
  }

  get price() {
    return 'price';
  }

  get size() {
    return 'size';
  }

  get subCategory() {
    return 'subCategory';
  }

  get id() {
    return 'id';
  }

  get images() {
    return 'images';
  }
}
