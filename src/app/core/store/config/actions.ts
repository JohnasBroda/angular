import { Product, QueryConfig, IProductsState } from '@products/';
import { Action } from '@ngrx/store';

export enum ConfigActionTypes {
  GET_PRODUCT_FILTERS = '[CONFIG] Get Product Filters',
  UPDATE_STATE = '[CONFIG] Update State',
  CONFIG_ERROR = '[CONFIG] Error',
}

export class GetProductFilters implements Action {
    readonly type = ConfigActionTypes.GET_PRODUCT_FILTERS;
  }

  export class UpdateState implements Action {
    readonly type = ConfigActionTypes.UPDATE_STATE;
    constructor(public payload: any) { }
  }

  export class ConfigError implements Action {
    readonly type = ConfigActionTypes.CONFIG_ERROR;
    constructor(public payload: any) { }
  }

export type All = GetProductFilters
    | UpdateState
    | ConfigError;
