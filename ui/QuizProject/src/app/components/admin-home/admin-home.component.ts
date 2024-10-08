import { HttpParams } from '@angular/common/http';
import { Component, OnInit, signal, Pipe } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { DeleteModel } from 'src/app/models/delete.model';
import { QuestionListModel } from 'src/app/models/question-list.model';
import { QuestionsModel } from 'src/app/models/questions.model';
import { BaseService } from 'src/app/services/base.service';
import { QuestionService } from 'src/app/services/question.service';
import { DeletePopupComponent } from 'src/app/shared/components/delete-popup/delete-popup.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  constructor(private questionService: QuestionService,private baseService: BaseService<QuestionsModel,QuestionListModel>,
    private dialog: MatDialog){

  }
  deleteModel: DeleteModel = {
    id: 0,
    controller: '',
    itemName: ''
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
  DeleteModelOpen(id: number) {
    this.deleteModel.id = id;
    this.deleteModel.controller = "/Questions";
    this.deleteModel.itemName = "Question";
    const deleteDialogRef = this.dialog.open(DeletePopupComponent, { width: "600px", data: this.deleteModel });
    deleteDialogRef.afterClosed().subscribe(result => {
      this.GetList();
    });
  }

  handlePageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.GetList();
  }

}
