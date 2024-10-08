import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoDirective } from './directives/demo.directive';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BaseModule } from './modules/common/common.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseInterceptor } from './shared/interceptor/base.interceptor';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeModule } from './modules/home/home.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { HeaderComponent } from './components/header/header.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';




@NgModule({
  declarations: [
    AppComponent,
    DemoDirective,
    NotfoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BaseModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HomeModule,
    AdminModule,
    UserModule,
    SocialLoginModule

  ],
  providers: [
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            "11835537092-jgohs6ve0fe6o42jni4ucl4209ca0hgr.apps.googleusercontent.com"
          ),
        },
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  },
  { 
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 1500 } 
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
