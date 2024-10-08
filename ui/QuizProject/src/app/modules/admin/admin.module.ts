import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from 'src/app/components/admin-home/admin-home.component';
import { BaseModule } from '../common/common.module';
import { AddEditQuestionComponent } from 'src/app/components/add-edit-question/add-edit-question.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { RadiowithinputComponent } from 'src/app/shared/components/forms/radiowithinput/radiowithinput.component';
import { ShowUserListComponent } from 'src/app/components/show-user-list/show-user-list.component';
import { RolesListComponent } from 'src/app/components/roles-list/roles-list.component';
import { AddEditRoleComponent } from 'src/app/components/add-edit-role/add-edit-role.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    AddEditQuestionComponent,
    PaginationComponent,
    RadiowithinputComponent,
    ShowUserListComponent,
    RolesListComponent,
    AddEditRoleComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BaseModule
  ]
})
export class AdminModule { }
