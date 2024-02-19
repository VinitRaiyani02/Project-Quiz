import { Injectable, signal } from '@angular/core';
import { TokenService } from '../shared/services/token.service';
import { apiPathForImage } from '../shared/constants/apipath.const';
import { BaseService } from './base.service';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private tokenService: TokenService, private baseService: BaseService<FormData, UserModel>) { }
  loggedIn = signal<boolean>(false);
  userRole = signal<string>('');
  userImg = signal<string>('');
  userName = signal<string>('');
  id: number = 0;

  setValues() {
    let role = sessionStorage.getItem('role');
    if (role != null) {
      this.userRole.set(role);
    }
    let userName = sessionStorage.getItem('userName');
    if(userName != null){
      this.userName.set(userName);
    }
    let imgPath = sessionStorage.getItem('userImagePath');
    this.userImg.set(apiPathForImage + imgPath);
    if (sessionStorage.getItem('token') != null && sessionStorage.getItem('token') != undefined && sessionStorage.getItem('token') != "") {
      this.loggedIn.set(true);
    }
  }
  GetValues() {
    this.baseService.GetDataById(this.tokenService.getCustomClaims().Id, "/GetUser").subscribe({
      next: (res) => {
        if (res.data != undefined) {
          sessionStorage.removeItem('role');
          sessionStorage.removeItem('userName');
          sessionStorage.setItem('role', res.data.roleId.toString());
          sessionStorage.setItem('userName',res.data.userName);
          if (res.data.userImgPath != undefined) {
            sessionStorage.removeItem('userImagePath');
            sessionStorage.setItem('userImagePath', res.data?.userImgPath);
          }
          this.setValues();
        }
      }
    })
  }

}
