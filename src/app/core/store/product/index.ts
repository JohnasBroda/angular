import { createFeatureSelector } from '@ngrx/store';
import { IAppState } from '@store/app.states';

export * from './reducer';
export * from './actions';
export * from './model';
export * from './effects';

export const selectProducts = (state: IAppState) => state.products.products;
export const selectProductState = (state: IAppState) => state.products;
