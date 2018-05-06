import * as fromProducts from '@products/index';
import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from '@authState/index';
import { RouterStateUrl } from 'app/shared/utils/ngrx.router';
import { User } from '@store/user/model';
import { Product, IProductsState } from '@products/index';
import { IConfigState } from '@store/config';

export interface IAppState {
    config: IConfigState;
    products: IProductsState;
    user: User;
    router: fromRouter.RouterReducerState<RouterStateUrl>;
}
