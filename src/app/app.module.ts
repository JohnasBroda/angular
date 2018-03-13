// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule, AngularFireStorage } from 'angularfire2/storage';

// COMPONENTS
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { AddToCartComponent } from './components/cart/add-to-cart/add-to-cart.component';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { CechkoutComponent } from './components/cechkout/cechkout.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginFormComponent } from './components/login-form-component/login-form-component.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductCardComponent } from './components/products/product-card/product-card.component';
import { ProductComponent } from './components/products/product/products.component';
import { ProductInCartCardComponent } from './components/cart/product-in-cart-card/product-in-cart-card.component';
import { ProductViewComponent } from './components/products/product-view/product-view.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';

// SERVICES
import { AuthGuard } from './services/auth-guard.service';
import { CartService } from './services/cart.service';
import { FireAuthService } from './services/fire-auth-service.service';
import { FireDbService } from './services/fire-db.service';
import { ProductService } from './services/product.service';
import { ScrollSvc } from './services/scroll-svc.service';
import { StorageSvc } from './services/storage.service';

// INTERFACES & ENUMS
import { Product } from './interfaces/Product';

// PIPES
import { FilterByPipe } from './interfaces/filterBy-pipe';
import { OrderByPipe } from './interfaces/orderBy-pipe';
import { PaginatorPipe } from './interfaces/paginator-pipe';

// DIRECTIVES
import { ClassesOnHoverDirective } from './directives/on-hover.directive';
import { DropzoneDirective } from 'app/directives/dropzone.directive';

// MODULES
import { AccordionModule } from 'primeng/accordion';
import { AlertModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CaptchaModule } from 'primeng/captcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainModule } from './modules/main/main.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialsModule } from './modules/materials.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { RouterModule, RouterStateSnapshot } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { SimpleSmoothScrollModule } from 'ng2-simple-smooth-scroll';
import { SliderModule } from 'primeng/slider';

// OTHER
import { environment } from '../environments/environment';
import { MatDialog } from '@angular/material';
import { MenuItem } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    FilterByPipe,
    LoginFormComponent,
    ProductComponent,
    UserComponent,
    AccessDeniedComponent,
    RegisterComponent,
    NotFoundComponent,
    LandingComponent,
    ProductCardComponent,
    EditProductComponent,
    LoginFormComponent,
    CartComponent,
    AddToCartComponent,
    ProductInCartCardComponent,
    ProductViewComponent,
    OrderByPipe,
    PaginatorPipe,
    ClassesOnHoverDirective,
    CechkoutComponent,
    DropzoneDirective,
  ],
  imports: [
    AccordionModule,
    MainModule,
    MatTabsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSelectModule,
    CaptchaModule,
    MatTooltipModule,
    SidebarModule,
    MatDialogModule,
    MatChipsModule,
    PopoverModule.forRoot(),
    AlertModule.forRoot(),
    BrowserModule,
    MaterialsModule,
    MatPaginatorModule,
    MatSliderModule,
    SimpleSmoothScrollModule,
    CheckboxModule,
    PaginatorModule,
    MatAutocompleteModule,
    SliderModule,
    MatCardModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    RouterModule.forRoot([
      { path: 'landing', component: LandingComponent },
      { path: 'login', component: LoginFormComponent},
      { path: 'users/:userId', component: UserComponent},
      { path: 'products/edit-product/:productName', component: EditProductComponent, canActivate: [AuthGuard]},
      { path: 'products/product/:productName', component: ProductViewComponent, canActivate: [AuthGuard]},
      { path: 'products', component: ProductComponent, canActivate: [AuthGuard]},
      { path: 'access-demoed', component: AccessDeniedComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'cart', component: CartComponent },
      { path: '**', component: NotFoundComponent },
    ]),
  ],
  providers: [
    FireAuthService,
    FireDbService,
    AngularFireDatabase,
    AuthGuard,
    ProductService,
    ScrollSvc,
    CartService,
    MatDialog,
    CartService,
    StorageSvc,
    AngularFireStorage,
  ],
  entryComponents: [
    AddToCartComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
