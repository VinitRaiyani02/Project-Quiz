import { Injectable, signal } from '@angular/core';
import { ISelectOptions } from '../models/forms/InputFieldsProps';
import { HttpClient } from '@angular/common/http';
import { InitiateModel } from '../models/initiate.model';
import { Observable } from 'rxjs';
import { apiPath } from '../shared/constants/apipath.const';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  GetLanguageList(): Observable<ISelectOptions[]> {
    return this.http.get<ISelectOptions[]>(apiPath +'/Language');
  }
}
