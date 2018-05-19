import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '@env/environment';

import { CartService } from '@services/cart.service';
import { FireDbService } from '@services/db/fire-db.service';
import { MatDialog } from '@angular/material';
import { PaginationService } from '@services/pagination.service';
import { PaymentService } from '@services/payment.service';
import { ProductService } from '@services/product.service';
import { StorageSvc } from '@services/utils/storage.service';
import { UploadService } from '@services/upload.service';
import { ToastService } from '@services/utils/toast.service';
import { ScrollSvc } from '@services/utils/scroll-svc.service';
import { AuthService } from '@services/auth/auth.service';
import { AnonAuthService } from '@services/auth/anon-auth.service';
import { EmailAuthService } from '@services/auth/email-auth.service';
import { FacebookAuthService } from '@services/auth/facebook-auth.service';
import { GoogleAuthService } from '@services/auth/google-auth.service';
import { AuthGuard } from '@services/auth/auth-guard.service';


const services = [
  AuthService,
  AnonAuthService,
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

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuard,
    services
  ],
})
export class CoreModule {
    /* make sure CoreModule is imported only by one NgModule the AppModule */
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      if (parentModule) {
        throw new Error('CoreModule is already loaded. Import only in AppModule');
      }
    }
}
