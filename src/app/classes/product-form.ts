import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IProduct } from '@store/products';
import { FormGroup } from '@angular/forms/src/model';

export abstract class ProductFormBase implements OnInit {

    public form: FormGroup;
    private schema: IProduct;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.buildForm();
    }

    private buildForm() {
        const controls = this.processSchema();
        this.form = this.fb.group({ controls });
    }

    private processSchema() {

    }

    private getControlType(type: string) {
    }
}
