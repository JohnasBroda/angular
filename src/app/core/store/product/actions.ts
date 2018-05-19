import { Action } from '@ngrx/store';
import { Product, QueryConfig, IProductsState } from '@store/product';

export enum ProductActionTypes {
  ADD_PRODUCT = '[Products] Add Product',
  ADD_PRODUCTS = '[Products] Add Products',
  CREATE_PRODUCT_SUCCESS = '[Products] Create Product Success',
  CREATE_PRODUCTS_SUCCESS = '[Products] Create Products Success',
  CLEAR_PRODUCTS = '[Products] Clear Products',
  DELETE_PRODUCT = '[Product] Delete Product',
  DELETE_PRODUCTS = '[Products] Delete Products',
  FILTER_CHANGED = '[Products] Filter Changed', // Updating products when there's no need for new query
  UPDATE_STATE = '[Products] Update State',
  LOAD_PRODUCTS = '[Product] Load Products', // updateing products with new query
  UPDATE_PRODUCT = '[Products] Update Product',
  UPDATE_PRODUCTS = '[Products] Update Products',
  PRODUCT_ERROR = '[Products] Product Error'
}

export class AddProduct implements Action {
  readonly type = ProductActionTypes.ADD_PRODUCT;
  constructor(public payload: Product) { }
}

export class AddProducts implements Action {
  readonly type = ProductActionTypes.ADD_PRODUCTS;
  constructor(public payload: Product[]) { }
}

export class CreateProductSuccess implements Action {
  readonly type = ProductActionTypes.CREATE_PRODUCT_SUCCESS;
  constructor(public payload: Product) { }
}

export class CreateProductsSuccess implements Action {
  readonly type = ProductActionTypes.CREATE_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) { }
}

export class ClearProducts implements Action {
  readonly type = ProductActionTypes.CLEAR_PRODUCTS;
}

export class DeleteProduct implements Action {
  readonly type = ProductActionTypes.DELETE_PRODUCT;
  constructor(public payload: { id: string }) { }
}

export class DeleteProducts implements Action {
  readonly type = ProductActionTypes.DELETE_PRODUCTS;
  constructor(public payload: { ids: string[] }) { }
}

export class FilterChanged implements Action {
  readonly type = ProductActionTypes.FILTER_CHANGED;
  constructor(public payload: {}) {}
}

export class UpdateState implements Action {
  readonly type = ProductActionTypes.UPDATE_STATE;
  constructor(public payload: Partial<IProductsState>) { }
}

export class LoadProducts implements Action {
  readonly type = ProductActionTypes.LOAD_PRODUCTS;
  constructor(public payload: QueryConfig) { }
}

export class ProductError implements Action {
  readonly type = ProductActionTypes.PRODUCT_ERROR;
  constructor(public payload: { error: Error }) { }
}

export class UpdateProduct implements Action {
  readonly type = ProductActionTypes.UPDATE_PRODUCT;
  constructor(public payload: { user: Product }) { }
}

export class UpdateProducts implements Action {
  readonly type = ProductActionTypes.UPDATE_PRODUCTS;
  constructor(public payload: { users: Product[] }) { }
}

export type All = AddProduct
  | AddProducts
  | CreateProductSuccess
  | CreateProductsSuccess
  | ClearProducts
  | DeleteProduct
  | DeleteProducts
  | FilterChanged
  | UpdateState
  | LoadProducts
  | UpdateProduct
  | UpdateProducts;
