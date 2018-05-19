import { IConfigState, FilterCategories } from './model';
import * as configActions from './actions';
import { ConfigActionTypes } from './actions';
import { IAppState } from '@store/app.states';

function getInitialState() {
  const configState: IConfigState = JSON.parse(localStorage.getItem('configState'));

  if (configState) {
    return configState;
  } else {
    return {
      loading: false,
      productsConfig: {
        filterUpdateCount: 0,
        filters: {
          category: [],
          color: [],
          size: [],
          subCategory: []
        }
      }
    };
  }
}

const initialState: IConfigState = getInitialState();

type Action = configActions.All;

export const selectConfig = (state: IAppState) => state.config;
export const selectProductConfig = (state: IAppState) => state.config.productsConfig;

export function reducer(state: IConfigState = initialState, action: Action): IConfigState {
    switch (action.type) {

      case ConfigActionTypes.GET_PRODUCT_FILTERS: {
        return { ...state, loading: true, };
      }

      case ConfigActionTypes.CONFIG_ERROR: {
        return { ...state, error: action.payload, loading: false };
      }

      case ConfigActionTypes.UPDATE_STATE: {
        return {
          ...state,
          productsConfig: {
            ...state.productsConfig,
            filters: { ...action.payload },
            filterUpdateCount: state.productsConfig.filterUpdateCount++
          },
          loading: false
        };
      }

      default: {
        return state;
      }
    }
}
