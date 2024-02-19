import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { InputFieldComponent } from 'src/app/shared/components/forms/input-field/input-field.component';
import { SelectFieldComponent } from 'src/app/shared/components/forms/select-field/select-field.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AddEditUserComponent } from 'src/app/components/add-edit-user/add-edit-user.component';


@NgModule({
  declarations: [
    InputFieldComponent,
    SelectFieldComponent,
    AddEditUserComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatPaginatorModule,
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    InputFieldComponent,
    CommonModule,
    SelectFieldComponent,
    MatButtonModule,
    MatToolbarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatPaginatorModule
  ]
})
export class BaseModule { }
