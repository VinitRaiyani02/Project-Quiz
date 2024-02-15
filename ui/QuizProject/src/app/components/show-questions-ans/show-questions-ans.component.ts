import { Component, OnInit } from '@angular/core';
import { QuestionViewModel } from 'src/app/models/questionview.model';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-show-questions-ans',
  templateUrl: './show-questions-ans.component.html',
  styleUrls: ['./show-questions-ans.component.css']
})
export class ShowQuestionsAnsComponent implements OnInit {

  constructor(private baseService: BaseService<QuestionViewModel[],QuestionViewModel[]>){

  }
  viewAnswers: QuestionViewModel[] = [];
  ngOnInit(): void {
    this.baseService.GetList('/UserQuestions').subscribe({
      next: (res) => {
        if(res.success){
          if(res.data != undefined){
            this.viewAnswers = res.data;
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  getCorrectAnswerCount(): number {
    return this.viewAnswers.filter(answer => answer.isCorrect).length;
  }
}
