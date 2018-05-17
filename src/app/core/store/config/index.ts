import { createFeatureSelector } from '@ngrx/store';
import { IAppState } from 'app/app.states';
import { Product } from '@store/products/product/model';

export * from './reducer';
export * from './actions';
export * from './model';
export * from './effects';

export const selectConfigState = (state: IAppState) => state.config;
