import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from 'src/app/models/user.model';
import { UsersListModel } from 'src/app/models/users.model';
import { BaseService } from 'src/app/services/base.service';
import { HelperService } from 'src/app/services/helper.service';
import { UserRole } from 'src/app/shared/enums/userrole.enum';

@Component({
  selector: 'app-show-user-list',
  templateUrl: './show-user-list.component.html',
  styleUrls: ['./show-user-list.component.css']
})
export class ShowUserListComponent implements OnInit {

  constructor(private baseService: BaseService<UserModel,UsersListModel>,
    private _snackbar: MatSnackBar,private helperService: HelperService){

  }
  currentPage: number = 0;
  pageSize: number = 10;
  userList: UsersListModel = {
    totalCount: 0
  };
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
  DeleteUser(email: string){
    if(email != ""){
      const params = new HttpParams().set("email",email);
      this.baseService.DeleteById(params,"/Users").subscribe({
        next: (res) => {
          if(res.success){
            this._snackbar.open(res.message, "ok", {
              duration: 1500,
              verticalPosition: "top",
              horizontalPosition: "right"
            })
            this.GetList();
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
