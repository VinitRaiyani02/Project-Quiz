import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RolesModel } from 'src/app/models/roles.model';
import { BaseService } from 'src/app/services/base.service';
import { AddEditRoleComponent } from '../add-edit-role/add-edit-role.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletePopupComponent } from 'src/app/shared/components/delete-popup/delete-popup.component';
import { DeleteModel } from 'src/app/models/delete.model';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {

  constructor(private baseService: BaseService<RolesModel[],RolesModel[]>,private dialog: MatDialog,
    private _snackbar: MatSnackBar){

  }
  role?: RolesModel = {
    id: 0,
    name: ''
  }
  deleteModel: DeleteModel = {
    id: 0,
    controller: '',
    itemName: ''
  }
  rolesList?: RolesModel[] = [];
  ngOnInit(): void {
    this.GetList();
  }
  GetList(){
    const params = new HttpParams();
    this.baseService.GetList("/Roles",params).subscribe({
      next: (res) => {
        if(res.success){
          this.rolesList = res.data;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  OpenModel(id: number){
    if(id != 0){
      if(this.rolesList != undefined){
        this.role = this.rolesList?.find(role => role.id == id);
      }
    }
    else{
      if(this.role != undefined){
        this.role.id = 0;
        this.role.name = '';
      }
    }
    const dialogRef = this.dialog.open(AddEditRoleComponent,{width:"900px",data: this.role});
    dialogRef.afterClosed().subscribe(result => {
      this.GetList();
    });
  }
  DeleteModelOpen(id: number){
   this.deleteModel.id = id;
   this.deleteModel.controller = "/Roles";
   this.deleteModel.itemName = "Role";
    const deleteDialogRef = this.dialog.open(DeletePopupComponent,{width:"600px",data: this.deleteModel});
    deleteDialogRef.afterClosed().subscribe(result => {
      this.GetList();
    });
  }
}
