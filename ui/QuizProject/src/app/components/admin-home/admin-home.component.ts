import { HttpParams } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuestionListModel } from 'src/app/models/question-list.model';
import { QuestionsModel } from 'src/app/models/questions.model';
import { BaseService } from 'src/app/services/base.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  constructor(private questionService: QuestionService,private router: Router,private baseService: BaseService<QuestionsModel,QuestionListModel>,
    private _snackbar: MatSnackBar){

  }
  questionlist: QuestionListModel = {
    totalCount: 0
  };
  currentPage: number = 0;
  pageSize: number = 10;
  ngOnInit(): void {
    this.GetList();
  }
  GetList(){
    const params = new HttpParams()
    .set("currentPage",this.currentPage)
    .set("pageSize",this.pageSize);
    this.baseService.GetList("/Questions",params).subscribe({
      next: (res) => {
        if(res.data != undefined){
          this.questionlist = res.data;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  DeleteQuestion(id: number){
    if(id != 0){
      const params = new HttpParams().set("id",id);
      this.baseService.DeleteById(params,"/Questions").subscribe({
        next: (res) => {
          if(res.success){
            this._snackbar.open(res.message, "ok", {
              duration: 1500,
              verticalPosition: "top",
              horizontalPosition: "right"
            })
            this.GetList();
          }
        }
      })
    }
  }
  handlePageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.GetList();
  }

}
