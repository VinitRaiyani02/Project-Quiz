import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPath } from '../shared/constants/apipath.const';
import { BaseApiResponse } from '../models/base-api-response';

@Injectable({
  providedIn: 'root'
})
export class BaseService<TRequestModel,TResponseModel> {

  constructor(private http:HttpClient) { }

GetList(controllerName: string){
  return this.http.get<BaseApiResponse<TResponseModel>>(apiPath + controllerName);
}

  GetDataById(id: number,controllerName: string){
    const params = new HttpParams().set("id",id);
    return this.http.get<BaseApiResponse<TResponseModel>>(apiPath + controllerName,{ params });
  }
  SaveData(RequestModel: TRequestModel,controllerName: string){
    return this.http.post<BaseApiResponse<TResponseModel>>(apiPath + controllerName,RequestModel)
  }

  DeleteById(id: number,controllerName: string){
    const params = new HttpParams().set("id",id);
    return this.http.delete<BaseApiResponse<TResponseModel>>(apiPath + controllerName,{ params });
  }
}
