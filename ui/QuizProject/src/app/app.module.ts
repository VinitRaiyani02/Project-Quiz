import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from './modules/common/common.module';
import { DemoDirective } from './directives/demo.directive';
import { TextfieldComponent } from './shared/components/textfield/textfield.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoDirective,
    TextfieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
