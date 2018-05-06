import { AccessDeniedComponent } from 'app/components/access-denied/access-denied.component';
import { CartComponent } from 'app/components/cart/cart.component';
import { CheckoutComponent } from 'app/components/cechkout/cechkout.component';
import { LandingComponent } from 'app/components/landing/landing.component';
import { LoginFormComponent } from 'app/components/login-form-component/login-form-component.component';
import { ProductComponent } from 'app/components/products/product/products.component';
import { EditProductComponent } from 'app/components/products/edit-product/edit-product.component';
import { ProductViewComponent } from 'app/components/products/product-view/product-view.component';
import { RegisterComponent } from 'app/components/register/register.component';
import { UploadFormComponent } from 'app/components/upload-form/upload-form.component';
import { UserComponent } from 'app/components/user/user.component';
import { NotFoundComponent } from 'app/components/not-found/not-found.component';
import { AuthGuard } from 'app/services/auth-guard.service';
import { AddProductComponent } from 'app/add-product/add-product.component';

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
    path: 'products/edit-product/:productName',
    component: EditProductComponent,
    data: { page: 'products/edit-product/:productName' },
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
    path: 'products/product/:productName',
    component: ProductViewComponent,
    data: { page: 'products/product/:productName' },
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
