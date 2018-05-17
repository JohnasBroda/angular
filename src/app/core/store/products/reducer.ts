import * as fromProducts from './index';
import { ProductActionTypes } from './product/actions';
import { Product, IProductsState } from '@store/products';
import { PageEvent } from '@angular/material';

export interface QueryConfig {
  // the pointer that we append to
  cursor: Product | null;
  // string reference of the collection path
  path?: string;
  // the property which we filter by on the server
  field?: string;
  // the amount of items loaded on each load event ( page size )
  limit?: number;
  // reverse the order
  reverse?: boolean;
  // push new items onto the begingin instead of the end of the array
  prepend?: boolean;
  // filter operators for server side filter
  operators?: firebase.firestore.WhereFilterOp[] | null;
  // used for server side filtering
  criterias?: any[] | null;
  // used for client side filtering
  filters?: { };
  searchTerm: string | null;
}

export interface IProductsState {
  // dataList
  products: Product[];
  // Query for fireStore
  query: QueryConfig;
  done: boolean;
  loading: boolean;
  error: null | Error;
  // wheter to use infiniteScroll or paginator mode
  infiniteScroll: boolean;
  // pageEvent {} for the paginator
  pageEvent: PageEvent | null;
  // indicating wheter the list should be reseted before the next action
  // TRUE on initialState & filterChange
  reset: boolean;
}

export const initialState: IProductsState = {
  error: null,
  loading: false,
  products: [],
  done: false,
  infiniteScroll: true,
  pageEvent: null,
  reset: true,
  query: {
      criterias: [0, Number.MAX_SAFE_INTEGER],
      cursor: null,
      field: 'price',
      limit: 5,
      operators: ['>=', '<='],
      path: 'products',
      prepend: false,
      reverse: false,
      filters: [],
      searchTerm: null
  },
};

function cursorsEquals(a: Product, b: Product): boolean {
  return a.id === b.id;
}

export function reducer(state: IProductsState = initialState, action: fromProducts.All): IProductsState {
  switch (action.type) {

    case ProductActionTypes.ADD_PRODUCT: {
      return { ...state, loading: true };
    }

    case ProductActionTypes.ADD_PRODUCTS: {
      return { ...state, loading: true };
    }

    case ProductActionTypes.CREATE_PRODUCT_SUCCESS: {
      return { ...state, loading: false, products: [...state.products, action.payload] };
    }

    case ProductActionTypes.CREATE_PRODUCTS_SUCCESS: {
      return { ...state, loading: false, products: [...state.products, ...action.payload] };
    }

    case ProductActionTypes.CLEAR_PRODUCTS: {
      return { ...state, ...initialState };
    }

    case ProductActionTypes.FILTER_CHANGED: {
      return { ...state, query: { ...state.query, filters: action.payload } };
    }

    case ProductActionTypes.DELETE_PRODUCT: {
      const prevState = { ...state };
      const newState = prevState;
      newState.products = prevState.products.filter((product: Product) => product.id !== action.payload.id);
      return newState;
    }

    case ProductActionTypes.DELETE_PRODUCTS: {
      const prevState = { ...state };
      const newState = prevState;
      newState.products = prevState.products.filter((product: Product) => !action.payload.ids.includes(product.id));
      return newState;
    }

    case ProductActionTypes.UPDATE_STATE: {
      let newProducts: Product[];
      // TRUE on initialState & filterChange
      if (action.payload.reset) {
        newProducts = action.payload.products;
      } else {
        newProducts = [ ...state.products, ...action.payload.products || [] ];
      }

      return {
        ...state,
        loading: false,
        products: newProducts,
        query: { ...state.query, ...(action.payload.query ? action.payload.query : {}) },
        done: action.payload.done !== ( null || undefined ) ? action.payload.done : state.done,
        infiniteScroll: action.payload.infiniteScroll !== ( null || undefined ) ? action.payload.infiniteScroll : state.infiniteScroll,
        pageEvent: action.payload.pageEvent !== ( null || undefined ) ? action.payload.pageEvent : state.pageEvent,
      };
    }

    case ProductActionTypes.LOAD_PRODUCTS: {
      // console.log({ ...state, loading: true, query: { ...state.query, ...action.payload } });
      return { ...state, loading: true, query: { ...state.query, ...action.payload } };
    }

    default: {
      return state;
    }
  }
}


