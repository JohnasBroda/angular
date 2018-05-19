import {
  AccessDeniedComponent,
  CartComponent,
  CheckoutComponent,
  LandingComponent,
  LoginFormComponent,
  EditProductComponent,
  AddProductComponent,
  ProductComponent,
  ProductViewComponent,
  RegisterComponent,
  UploadFormComponent,
  UserComponent,
  NotFoundComponent
} from '@components';
import { AuthGuard } from '@services/auth/auth-guard.service';


export const routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'access-demoed',
    component: AccessDeniedComponent,
    data: { page: 'access-demoed' }
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { page: 'cart' }
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { page: 'checkout' }
  },
  {
    path: 'landing',
    component: LandingComponent,
    data: { page: 'landing' }
  },
  {
    path: 'login',
    component: LoginFormComponent,
    data: { page: 'login' }
  },
  {
    path: 'products/edit-product/:id',
    component: EditProductComponent,
    data: { page: 'products/edit-product/:id' },
    canActivate: [AuthGuard]
  },
  {
    path: 'products/add',
    component: AddProductComponent,
    data: { page: 'products/add' },
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    component: ProductComponent,
    data: { page: 'products' },
    canActivate: [AuthGuard]
  },
  {
    path: 'products/product/:Id',
    component: ProductViewComponent,
    data: { page: 'products/:id' },
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { page: 'register' },
  },
  {
    path: 'upload',
    component: UploadFormComponent,
    data: { page: 'upload' },
  },
  {
    path: 'users/:userId',
    component: UserComponent,
    data: { page: 'users/:userId' },
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { page: 'access-demoed' },
  },
];
