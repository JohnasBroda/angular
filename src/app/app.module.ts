import { ConfigEffects } from './core/store/config/effects';
import { AppComponent } from 'app/app.component';
import { ProductCardComponent } from './components/products/product-card/product-card.component';
// DIRECTIVES
import { ClassesOnHoverDirective } from 'app/directives/on-hover.directive';
import { DropzoneDirective } from 'app/directives/dropzone.directive';

// COMPONENETS
import { AddToCartComponent } from 'app/components/cart/add-to-cart/add-to-cart.component';
import { ProductInCartCardComponent } from 'app/components/cart/product-in-cart-card/product-in-cart-card.component';
import { ToastCardComponent } from 'app/components/toast-card/toast-card.component';

// MODUlES
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainModule } from 'app/modules/main/main.module';
import { MatAutocompleteModule,
         MatCardModule,
        MatChipsModule,
        MatDialogModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSliderModule,
        MatSnackBarModule,
        MatTabsModule,
        MatTooltipModule,
        MatDialog } from '@angular/material';
import { MaterialsModule } from 'app/modules/materials.module';
import { StoreModule } from '@ngrx/store';
import { SliderModule } from 'primeng/slider';
import { PaginatorModule } from 'primeng/paginator';
import { GrowlModule } from 'primeng/growl';
import { DataListModule } from 'primeng/datalist';
import { CssVarsModule } from 'ngx-css-variables';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AccordionModule, AlertModule, PopoverModule } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';

// OTHER
import { environment } from '@environments/environment';

// PIPES
import { DataSizePipe } from 'app/shared/pipes/data-size-pipe';
import { FilterByPipe } from 'app/interfaces/filterBy-pipe';
import { OrderByPipe } from 'app/interfaces/orderBy-pipe';

// SERVICES
import { AnonAuthService } from 'app/services/anon-auth.service';
import { CartService } from 'app/services/cart.service';
import { EmailAuthService } from 'app/services/email-auth.service';
import { FacebookAuthService } from 'app/services/facebook-auth.service';
import { FireDbService } from 'app/services/fire-db.service';
import { GoogleAuthService } from 'app/services/google-auth.service';
import { PaymentService } from 'app/services/payment.service';
import { ProductService } from 'app/services/product.service';
import { ScrollSvc } from 'app/services/scroll-svc.service';
import { StorageSvc } from 'app/services/storage.service';
import { ToastService } from 'app/services/toast.service';
import { UploadService } from 'app/services/upload.service';

// SPINNER COMPONENTS
import {  BarsSpinnerComponent,
  BubblingCirclesSpinnerComponent,
  FadingCircleSpinnerComponent,
  FlippingRectangleSpinnerComponent,
  FoldingRectanglesSpinnerComponent,
  GrwoingCirclesSpinnerComponent,
  RectanglesSpinnerComponent,
  SmallCirclesRoundSpinnerComponent,
  SmallRectanglesSpinnerComponent,
  SpinnerContainerComponent,
  ThreeCirclesLineSpinnerComponent } from '@spinners';

// EFFECTS
import { AuthEffects } from '@store/auth';

// REDUCERS
import { coreReducer, metaReducers } from 'app/reducers';
import { RouterModule } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AccessDeniedComponent } from 'app/components/access-denied/access-denied.component';
import { CartComponent } from 'app/components/cart/cart.component';
import { CheckoutComponent } from 'app/components/cechkout/cechkout.component';
import { EditProductComponent } from 'app/components/products/edit-product/edit-product.component';
import { LandingComponent } from 'app/components/landing/landing.component';
import { LoginFormComponent } from 'app/components/login-form-component/login-form-component.component';
import { NotFoundComponent } from 'app/components/not-found/not-found.component';
import { ProductComponent } from 'app/components/products/product/products.component';
import { ProductViewComponent } from 'app/components/products/product-view/product-view.component';
import { RegisterComponent } from 'app/components/register/register.component';
import { UserComponent } from 'app/components/user/user.component';
import { UploadFormComponent } from 'app/components/upload-form/upload-form.component';
import { AuthGuard } from 'app/services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from 'app/app.routing';
import { PaginatorPipe } from 'app/interfaces/paginator-pipe';
import { AuthService } from 'app/services/auth.service';
import { ProductEffects } from '@store/products';
import { AddProductComponent } from './add-product/add-product.component';
import { ScrollableDirective } from './directives/scrollable.directive';
import { PaginationService } from 'app/services/pagination.service';
import { UserSourcesComponent } from './components/user-sources/user-sources.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { TokenInterceptor } from 'app/core/token.interceptor';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from 'app/router-reducer';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { ObjPropertiesPipe } from './interfaces/obj-properties.pipe';
import { SortPipe } from './interfaces/sort.pipe';

const directives = [
  ClassesOnHoverDirective,
  DropzoneDirective,
  ScrollableDirective,
];

const modules = [
  HttpClientModule,
  AccordionModule,
  ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  AlertModule.forRoot(),
  AngularFireAuthModule,
  AngularFireDatabaseModule,
  AngularFireStorageModule,
  AngularFirestoreModule,
  BrowserAnimationsModule,
  ButtonModule,
  AngularFireModule.initializeApp(environment.firebase),
  BrowserModule,
  StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  RouterModule.forRoot(routes),
  CheckboxModule,
  CssVarsModule.forRoot(),
  DataListModule,
  EffectsModule.forRoot([
    AuthEffects,
    ProductEffects,
    ConfigEffects,
  ]),
  FormsModule,
  GrowlModule,
  MainModule,
  MatAutocompleteModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MaterialsModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTabsModule,
  MatTooltipModule,
  PaginatorModule,
  PopoverModule.forRoot(),
  ReactiveFormsModule,
  SliderModule,
  StoreModule.forRoot(coreReducer, { metaReducers }),
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
];

const pipes = [
  ObjPropertiesPipe,
  DataSizePipe,
  FilterByPipe,
  OrderByPipe,
  PaginatorPipe,
];

const services = [
  AuthService,
  AnonAuthService,
  AngularFireDatabase,
  CartService,
  EmailAuthService,
  FacebookAuthService,
  FireDbService,
  GoogleAuthService,
  MatDialog,
  PaginationService,
  PaymentService,
  ProductService,
  ScrollSvc,
  StorageSvc,
  ToastService,
  UploadService,
];

const spinnerComponents = [
  BarsSpinnerComponent,
  BubblingCirclesSpinnerComponent,
  FadingCircleSpinnerComponent,
  FlippingRectangleSpinnerComponent,
  FoldingRectanglesSpinnerComponent,
  GrwoingCirclesSpinnerComponent,
  RectanglesSpinnerComponent,
  SmallCirclesRoundSpinnerComponent,
  SmallRectanglesSpinnerComponent,
  ThreeCirclesLineSpinnerComponent,
];

const entryComponents = [
  AddToCartComponent,
];

const components = [
  AppComponent,
  AddToCartComponent,
  ProductInCartCardComponent,
  SpinnerContainerComponent,
  ToastCardComponent,
  AccessDeniedComponent,
  CartComponent,
  CheckoutComponent,
  EditProductComponent,
  LandingComponent,
  LoginFormComponent,
  NotFoundComponent,
  ProductComponent,
  ProductCardComponent,
  ProductViewComponent,
  RegisterComponent,
  UploadFormComponent,
  UserComponent,
];

@NgModule({
  declarations: [
    spinnerComponents,
    directives,
    pipes,
    components,
    entryComponents,
    AddProductComponent,
    ScrollableDirective,
    UserSourcesComponent,
    PaymentFormComponent,
    ObjPropertiesPipe,
    SortPipe
  ],
  entryComponents: [
    spinnerComponents,
    entryComponents
  ],
  imports: [modules],
  providers: [
    pipes,
    services,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
