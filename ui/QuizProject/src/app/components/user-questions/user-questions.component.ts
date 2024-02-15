import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuestionAnsSummary } from 'src/app/models/question-ans-summary.model';
import { QuestionListModel } from 'src/app/models/question-list.model';
import { OptionAnsItem, QuestionsModel } from 'src/app/models/questions.model';
import { BaseService } from 'src/app/services/base.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-user-questions',
  templateUrl: './user-questions.component.html',
  styleUrls: ['./user-questions.component.css']
})
export class UserQuestionsComponent implements OnInit {

  constructor(private questionService: QuestionService,private baseServce: BaseService<QuestionListModel,QuestionAnsSummary>,
    private router: Router,private _snackbar: MatSnackBar){
    
  }
  questionList: QuestionListModel = {
    totalCount: 0
  };
  index: number = 0;
  notAllQuestionsAnswered: boolean = false;
  ngOnInit(): void {
    this.questionService.GetList().subscribe({
      next: (res) => {
        console.log(res.data);
        if(res.data != undefined){
          this.questionList = res.data;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  goToQuestion(index: number): void {
    this.index = index;
  }
  isQuestionAnswered(question: QuestionsModel): boolean {
    if (question.questionType === 'Text') {
      return question.optionAns[0]?.option !== undefined && question.optionAns[0]?.option.trim() !== '';
    } else {
      return question.optionAns.some(option => option.isAns);
    }
  }
  areAllQuestionsAnswered(): boolean {
    if (this.questionList?.list) {
      return this.questionList.list.every(question => this.isQuestionAnswered(question));
    }
    return false;
  }

  updateInputOption(event: Event) {
    const value = (event.target as HTMLInputElement)?.value;
    if (value !== undefined && this.questionList.list != undefined) {
      this.questionList.list[this.index].optionAns[0].option = value;
    }
  }
  selectRadioOption(option: OptionAnsItem): void {
    if(this.questionList.list != undefined){
      this.questionList.list[this.index].optionAns.forEach(opt => opt.isAns = false);
    }
    option.isAns = true;
  }
  selectCheckboxOption(option: OptionAnsItem): void {
    option.isAns = !option.isAns; 
  }
  nextQuestion(): void {
    if(this.index != 9){
      if(this.index < this.questionList.totalCount){
        this.index = this.index + 1;
      }
    }
  }
  previousQuestion(): void {
    if(this.index != 0){
        this.index = this.index - 1;
    }
  }

  submitAnswers(): void {
    if (this.areAllQuestionsAnswered()) {
      this.baseServce.SaveData(this.questionList, "/UserQuestions").subscribe({
        next: (res) => {
          if (res.success) {
            alert("you have answered" + res.data?.correctAnswers + " right questions");
            this.router.navigate(['user/report']);
          }
          this._snackbar.open(res.message, "", {
            duration: 1500,
            verticalPosition: "top",
            horizontalPosition: "right"
          })
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      this.notAllQuestionsAnswered = true;
    }
  }
}
