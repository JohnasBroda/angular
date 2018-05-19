import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ClassesOnHoverDirective,
  DropzoneDirective,
  ScrollableDirective
} from '@directives';
import {
  ObjPropertiesPipe,
  DataSizePipe,
  FilterByPipe,
  OrderByPipe,
  PaginatorPipe,
  SortPipe
} from '@pipes';
import {
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
  SpinnerContainerComponent
} from '@spinners';
import {
  AddToCartComponent,
  ProductImageComponent,
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
  AddProductComponent,
  UserSourcesComponent,
  PaymentFormComponent,
  MainNavComponent
} from '@components';
import { AppComponent } from '@app/app.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DataListModule } from 'primeng/datalist';
import { GrowlModule } from 'primeng/growl';
import { PaginatorModule } from 'primeng/paginator';
import { SliderModule } from 'primeng/slider';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AccordionModule,
  AlertModule,
  PopoverModule
} from 'ngx-bootstrap';
import {
  MatAutocompleteModule,
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
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'angular2-useful-swiper';

// ------------------------------------ CONSTANTS ----------------------------------------------------

const components = [
  MainNavComponent,
  AddProductComponent,
  UserSourcesComponent,
  PaymentFormComponent,
  ProductImageComponent,
  AppComponent,
  AddToCartComponent,
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

const directives = [
  ClassesOnHoverDirective,
  DropzoneDirective,
  ScrollableDirective,
];

const entryComponents = [
  AddToCartComponent,
];

const pipes = [
  SortPipe,
  ObjPropertiesPipe,
  DataSizePipe,
  FilterByPipe,
  OrderByPipe,
  PaginatorPipe,
];

const angularModules = [
  RouterModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule
];

const bootstrapModules = [
  AccordionModule,
  AlertModule,
  PopoverModule
];

const materialModules = [
  MatAutocompleteModule,
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
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule
];

const primeNgModules = [
  ButtonModule,
  CheckboxModule,
  DataListModule,
  GrowlModule,
  PaginatorModule,
  SliderModule
];

const imports = [
  SwiperModule,
  angularModules,
  materialModules,
  bootstrapModules,
  primeNgModules
];

const spinners = [
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

@NgModule({
  imports: [imports],
  declarations: [
    components,
    directives,
    pipes,
    spinners
  ],
  entryComponents: [entryComponents],
  providers: [pipes],
  exports: [
    components,
    directives,
    pipes,
    imports,
    entryComponents
  ]
})
export class SharedModule {}
