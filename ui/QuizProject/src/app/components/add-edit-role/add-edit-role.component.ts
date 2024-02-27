import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { RolesListComponent } from '../roles-list/roles-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolesModel } from 'src/app/models/roles.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputFieldProps } from 'src/app/models/forms/InputFieldsProps';
import { BaseService } from 'src/app/services/base.service';
import { SnackbarConfig } from 'src/app/models/snackbar-config';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html'
})
export class AddEditRoleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RolesListComponent>, @Inject(MAT_DIALOG_DATA) public data: RolesModel,
    private baseService: BaseService<RolesModel, RolesModel>,private snackbarService: SnackbarService) {

  } 

  id: number = this.data.id;
  roleForm: FormGroup = new FormGroup('');
  role: RolesModel = {
    id: 0,
    name: ''
  }
  inputRoleNameField: InputFieldProps = {
    ControlName: 'name',
    Type: 'text',
    Label: 'Role',
    IsDisabled: false,
    PlaceHolder: 'write here'
  }
  snackbarConfig: SnackbarConfig = {
    message: '',
    duration: 2000
  }
  ngOnInit(): void {
    this.roleForm = new FormGroup({
      name: new FormControl(this.data.name, Validators.required)
    });

    this.roleForm.valueChanges.subscribe({
      next: (val) => {
        this.role.name = val.name;
      }
    })
  }
  cancleClick(): void {
    this.dialogRef.close();
  }
  SaveData() {
    const fields = document.querySelectorAll('.form-submitted');
    fields.forEach(f => {
      f.classList.remove('form-submitted');
    })
    if (this.roleForm.valid) {
      this.role.id = this.data.id;
      this.baseService.SaveData(this.role, "/Roles").subscribe({
        next: (res) => {
          if (res.success) {
            this.dialogRef.close();
            this.snackbarConfig.message = res.message;
            this.snackbarConfig.status = res.success ? 'success' : 'error';
            this.snackbarService.show(this.snackbarConfig);
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
