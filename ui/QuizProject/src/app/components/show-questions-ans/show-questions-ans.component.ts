import { Component, OnInit } from '@angular/core';
import { QuestionViewModel } from 'src/app/models/questionview.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-show-questions-ans',
  templateUrl: './show-questions-ans.component.html',
  styleUrls: ['./show-questions-ans.component.css']
})
export class ShowQuestionsAnsComponent implements OnInit {

  constructor(private questionService: QuestionService){

  }
  viewAnswers: QuestionViewModel[] = [];
  ngOnInit(): void {
    this.questionService.GetUserAnsReport().subscribe({
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
