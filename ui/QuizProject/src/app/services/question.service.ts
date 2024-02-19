import { Injectable } from '@angular/core';
import { BaseApiResponse } from '../models/base-api-response';
import { QuestionsModel } from '../models/questions.model';
import { apiPath } from '../shared/constants/apipath.const';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QuestionListModel } from '../models/question-list.model';
import { QuestionViewModel } from '../models/questionview.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  currentPage: number = 0;
  pageSize: number = 10;
  GetList(){
    const params = new HttpParams()
    .set("currentPage",this.currentPage)
    .set("pageSize",this.pageSize);
    return this.http.get<BaseApiResponse<QuestionListModel>>(apiPath + "/Questions",{ params });
  }
  
  GetUserAnsReport(){
    return this.http.get<BaseApiResponse<QuestionViewModel[]>>(apiPath + "/UserQuestions");
  }

  SaveData(data: QuestionsModel){
    return this.http.post<BaseApiResponse<QuestionsModel>>(apiPath + "/Questions",data);
  }
}
