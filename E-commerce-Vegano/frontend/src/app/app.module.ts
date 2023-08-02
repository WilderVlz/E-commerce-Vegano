import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from '@abacritt/angularx-social-login';

/*NgRx*/
import {StoreModule} from '@ngrx/store';
import {appReducer} from "./store/reducers/app.reducer";
import {cartReducer} from "./store/reducers/cart.reducer";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {pedidoReducer} from './store/reducers/pedido.reducer';
import {NgxStripeModule} from 'ngx-stripe';
import {CartEffects} from "./store/effects/cart.effects";
import {userReducer} from "./store/reducers/user.reducer";
import {UserEffects} from "./store/effects/user.effects";
import {cardReducer} from './store/reducers/card.reducer';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    SocialLoginModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      app: appReducer,
      user: userReducer,
      cart: cartReducer,
      pedido: pedidoReducer,
      card: cardReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 999999, // Retains last 25 states
      // Restrict extension to log-only mode


    }),

    NgxStripeModule.forRoot('pk_test_51NXSCVGOZk6s2DM2ZIs3a7LDjStAPHKpQwsRWvyvzR6uLaSs8Vzm3CyBxghm5ORZqO6HuGq6eGMlTkzxmNScCkvi00vJuexg0O'),
    EffectsModule.forRoot([CartEffects, UserEffects]),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [

          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('2222756371259035')
          },

        ],
        onError: (err) => {
          console.log("err =>", err);
        }
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    //{ provide: APP_BASE_HREF, useValue: '/restaurante/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
