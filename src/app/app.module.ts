import { AddProductComponent, UserSourcesComponent, PaymentFormComponent } from '@components';
import { ScrollableDirective } from '@directives';
import { ObjPropertiesPipe, SortPipe } from '@pipes';
import { MainNavComponent } from '@shared/components/main-nav/main-nav.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '@environments/environment';
import { isPlatformServer, CommonModule } from '@angular/common';
import { PLATFORM_ID, NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { CoreModule } from '@app/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@store/auth';
import { ProductEffects } from '@store/product';
import { ConfigEffects } from '@store/config';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';
import { coreReducer } from '@store/core.reducer';
import { metaReducers } from '@store/meta.reducer';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { AppRoutingModule } from '@app/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '@core/interceptors/token.interceptor';
import { CustomSerializer } from '@store/router/router-reducer';
import { AppComponent } from '@app/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    isPlatformServer(PLATFORM_ID) ? [] : AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    CoreModule,
    EffectsModule.forRoot([
        AuthEffects,
        ProductEffects,
        ConfigEffects,
    ]),
    SharedModule,
    StoreModule.forRoot(coreReducer, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    Title,
    Meta,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
],
  bootstrap: [AppComponent],
})
export class AppModule { }
