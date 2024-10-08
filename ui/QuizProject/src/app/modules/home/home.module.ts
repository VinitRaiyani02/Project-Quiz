import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { HomeRoutingModule } from './home-routing.module';
import { BaseModule } from '../common/common.module';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BaseModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
