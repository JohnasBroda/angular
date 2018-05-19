import { IAppState } from '@store/app.states';

export * from './reducer';
export * from './actions';
export * from './model';
export * from './effects';

export const selectConfigState = (state: IAppState) => state.config;
