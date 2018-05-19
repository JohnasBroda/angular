import { MetaReducer, ActionReducer } from '@ngrx/store';
import { environment } from '@env/environment';
import { IAppState } from '@store/app.states';

// logging for dev mode
export function logger(reducer: ActionReducer<IAppState>): ActionReducer<IAppState> {
    return (state: IAppState, action: any): IAppState => {
      console.log('state', state);
      console.log('action', action);
      return reducer(state, action);
    };
  }

export const metaReducers: Array<MetaReducer<IAppState>> = !environment.production
? [logger]
: [];
