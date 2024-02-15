import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { BaseModule } from '../common/common.module';
import { UserHomeComponent } from 'src/app/components/user-home/user-home.component';
import { UserQuestionsComponent } from 'src/app/components/user-questions/user-questions.component';
import { ShowQuestionsAnsComponent } from 'src/app/components/show-questions-ans/show-questions-ans.component';


@NgModule({
  declarations: [
    UserComponent,
    UserHomeComponent,
    UserQuestionsComponent,
    ShowQuestionsAnsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    BaseModule
  ]
})
export class UserModule { }

