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
import { AddEditUserComponent } from 'src/app/components/add-edit-user/add-edit-user.component';
import { FileFieldComponent } from 'src/app/shared/components/forms/file-field/file-field.component';
import { MatDialogModule} from '@angular/material/dialog';
import { DeletePopupComponent } from 'src/app/shared/components/delete-popup/delete-popup.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MessageSnackbarComponent } from 'src/app/shared/components/message-snackbar/message-snackbar.component';


@NgModule({
  declarations: [
    InputFieldComponent,
    SelectFieldComponent,
    AddEditUserComponent,
    FileFieldComponent,
    DeletePopupComponent,
    MessageSnackbarComponent
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
    MatDialogModule,
    MatIconModule,
    MatMenuModule
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
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class BaseModule { }
