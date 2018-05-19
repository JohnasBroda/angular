import { IConfigState } from '@store/config';
import { IProductsState } from '@store/product';
import { User } from '@store/auth';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '@store/router/ngrx.router';

export interface IAppState {
    config: IConfigState;
    products: IProductsState;
    user: User;
    router: RouterReducerState<RouterStateUrl>;
}
