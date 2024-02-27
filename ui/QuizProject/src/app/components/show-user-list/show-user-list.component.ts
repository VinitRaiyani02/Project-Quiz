import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteModel } from 'src/app/models/delete.model';
import { UserModel } from 'src/app/models/user.model';
import { UsersListModel } from 'src/app/models/users.model';
import { BaseService } from 'src/app/services/base.service';
import { HelperService } from 'src/app/services/helper.service';
import { DeletePopupComponent } from 'src/app/shared/components/delete-popup/delete-popup.component';
import { UserRole } from 'src/app/shared/enums/userrole.enum';

@Component({
  selector: 'app-show-user-list',
  templateUrl: './show-user-list.component.html',
  styleUrls: ['./show-user-list.component.css']
})
export class ShowUserListComponent implements OnInit {

  constructor(private baseService: BaseService<UserModel,UsersListModel>,
    private helperService: HelperService,private dialog: MatDialog){

  }
  currentPage: number = 0;
  pageSize: number = 10;
  userList: UsersListModel = {
    totalCount: 0
  };
  deleteModel: DeleteModel = {
    id: 0,
    controller: '',
    itemName: ''
  }
  userRoles: UserRole = 1;
  ngOnInit(): void {
    this.GetList();
    this.helperService.GetValues();
  }
  getRoleName(roleId: UserRole): string {
    return UserRole[roleId];
  }
  GetList(){
    const params = new HttpParams()
    .set("currentPage",this.currentPage)
    .set("pageSize",this.pageSize);
      this.baseService.GetList("/Users",params).subscribe({
        next: (res) => {
          if(res.success && res.data != undefined){
              this.userList = res.data;
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
  }
  handlePageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.GetList();
  }
  DeleteModelOpen(id: number){
    this.deleteModel.id = id;
    this.deleteModel.controller = "/Users";
    this.deleteModel.itemName = "User";
     const deleteDialogRef = this.dialog.open(DeletePopupComponent,{width:"600px",data: this.deleteModel});
     deleteDialogRef.afterClosed().subscribe(result => {
       this.GetList();
     });
   }

}
