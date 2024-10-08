import { HttpClient, HttpParams,HttpBackend  } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { UserModel } from '../models/user.model';
import { BaseApiResponse } from '../models/base-api-response';
import { ISelectOptions } from '../models/forms/InputFieldsProps';
import { apiPath } from '../shared/constants/apipath.const';
import { LoginResponse } from '../models/loginresponse.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private handler:HttpBackend) { 
    this.http = new HttpClient(this.handler);
  }

  Login(email: string,password: string){
    const params = new HttpParams()
    .set('email',email)
    .set('password',password);
      return this.http.get<BaseApiResponse<LoginResponse>>(apiPath + "/User",{ params });
  }

  SaveData(data: FormData){
    return this.http.post<BaseApiResponse<UserModel>>(apiPath + "/User",data);
  }
}
