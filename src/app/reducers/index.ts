import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
  } from '@ngrx/store';
  import * as fromProducts from '@products/index';
  import * as fromRouter from '@ngrx/router-store';
  import * as fromAuth from '@authState/index';
  import * as fromConfig from '@configState/index';
  import { IAppState } from 'app/app.states';
import { environment } from '@environments/environment';

  /**
   * Our state is composed of a map of action reducer functions.
   * These reducer functions are called with each dispatched action
   * and the current or initial state and return a new immutable state.
   */
  export const coreReducer: ActionReducerMap<any> = {
    config: fromConfig.reducer,
    products: fromProducts.reducer,
    user: fromAuth.reducer,
    router: fromRouter.routerReducer,
  };

  // logging for dev mode
  export function logger(reducer: ActionReducer<IAppState>): ActionReducer<IAppState> {
    return function (state: IAppState, action: any): IAppState {
      console.log('state', state);
      console.log('action', action);

      return reducer(state, action);
    };
  }

  export const metaReducers: MetaReducer<IAppState>[] = !environment.production
    ? [logger]
    : [];

