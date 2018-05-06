import { IAppState } from 'app/app.states';
import { AuthActionTypes, All, GetUser } from './actions';
import * as authActions from './actions';
import { User } from '@store/user/model';
import { INITIAL_REDUCERS } from '@ngrx/store/src/tokens';

function getInitialState() {
  const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser ? currentUser : new User(null, null, 'Guest', 'anonymous');
}

const initialState: User = getInitialState();

type Action = authActions.All;

export const selectUser = (state: IAppState) => state.user;

export function reducer(state: User = initialState, action: Action): User {
    switch (action.type) {

      case AuthActionTypes.GET_USER: {
        return { ...state, ...action.payload, loading: true, };
      }

      case AuthActionTypes.AUTHENTICATED: {
        return { ...state, ...action.payload, loading: false };
      }

      case AuthActionTypes.NOT_AUTHENTICATED: {
        return { ...state, ...initialState, loading: false };
      }

      case AuthActionTypes.LOGIN_EMAIL:
      case AuthActionTypes.LOGIN_FACEBOOK:
      case AuthActionTypes.LOGIN_GOOGLE: {
        return { ...state, loading: true, };
      }

      case AuthActionTypes.LOGIN_SUCCESS: {
        return { ...state, loading: false, };
      }

      case AuthActionTypes.LOGIN_ERROR: {
        return { ...state, ...action.payload, loading: false };
      }

      case AuthActionTypes.LOGOUT: {
        return { ...state, ...initialState };
      }

      case AuthActionTypes.UPDATE_USER: {
        return { ...state, ...action.payload, loading: false };
      }

      case AuthActionTypes.VERIFY_REGISTRATION: {
        return { ...state, loading: true };
      }

      default: {
        return state;
      }
    }
}
