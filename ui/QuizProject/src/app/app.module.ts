import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoDirective } from './directives/demo.directive';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BaseModule } from './modules/common/common.module';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseInterceptor } from './shared/interceptor/base.interceptor';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeModule } from './modules/home/home.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';




@NgModule({
  declarations: [
    AppComponent,
    DemoDirective,
    NotfoundComponent,
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
    UserModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
