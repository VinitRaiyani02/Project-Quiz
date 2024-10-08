import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolesListComponent } from 'src/app/components/roles-list/roles-list.component';
import { DeleteModel } from 'src/app/models/delete.model';
import { SnackbarConfig } from 'src/app/models/snackbar-config';
import { BaseService } from 'src/app/services/base.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html'
})
export class DeletePopupComponent {

  constructor(public dialogRef: MatDialogRef<Component>, @Inject(MAT_DIALOG_DATA) public data: DeleteModel ,private baseService:BaseService<DeleteModel,DeleteModel>,
  private snackbarService: SnackbarService){

  }
  snackbarConfig: SnackbarConfig = {
    message: '',
    duration: 2000
  }
  Delete(id: number){
    const params = new HttpParams().set("id",id);
    this.baseService.DeleteById(params,this.data.controller).subscribe({
      next: (res) => {
        if(res.success){
          this.snackbarConfig.message = res.message;
          this.snackbarConfig.status = res.success ? 'success' : 'error';
          this.snackbarService.show(this.snackbarConfig);
          this.dialogRef.close();
        }
      }
    })
  }
  close(){
    this.dialogRef.close();
  }
}
