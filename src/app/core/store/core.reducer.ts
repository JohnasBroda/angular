import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import * as fromProducts from '@store/product/index';
import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from '@store/auth/index';
import * as fromConfig from '@store/config/index';

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const coreReducer: ActionReducerMap<any> = {
  config: fromConfig.reducer,
  products: fromProducts.reducer,
  user: fromAuth.reducer,
  router: fromRouter.routerReducer
};
