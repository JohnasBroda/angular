import { createFeatureSelector } from '@ngrx/store';
import { IAppState } from 'app/app.states';
import { Product } from '@store/products/product/model';

export * from './reducer';
export * from './product/actions';
export * from './product/model';
export * from './product/effects';

export const selectProducts = (state: IAppState) => state.products.products;
export const selectProductState = (state: IAppState) => state.products;
