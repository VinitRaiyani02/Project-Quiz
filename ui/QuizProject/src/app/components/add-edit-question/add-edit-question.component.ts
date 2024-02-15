import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { InputFieldProps, questionTypeSelectOptions } from 'src/app/models/forms/InputFieldsProps';
import { QuestionsModel } from 'src/app/models/questions.model';
import { BaseService } from 'src/app/services/base.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-add-edit-question',
  templateUrl: './add-edit-question.component.html',
  styleUrls: ['./add-edit-question.component.css']
})
export class AddEditQuestionComponent implements OnInit {

  constructor(private fb: FormBuilder,private service: QuestionService,private _snackbar: MatSnackBar,private router: Router,
    private route: ActivatedRoute,private baseService: BaseService<QuestionsModel,QuestionsModel>) {}
  questionForm: FormGroup = new FormGroup('');

  inputQuestionTextProps: InputFieldProps = {
    ControlName: 'questiontext',
    Type: 'textarea',
    Label: 'Question',
    IsDisabled: false,
    PlaceHolder: 'write here'
  }
  inputQuestionType: InputFieldProps = {
    ControlName: 'questionType',
    Type: '',
    Label: 'Question type',
    IsDisabled: false,
    PlaceHolder: '',
    SelectOptions: questionTypeSelectOptions
  }

  questionModel: QuestionsModel = {
    questionText: '',
    questionType: '',
    optionAns: [],
    id: 0
  }
  id:number = 0;
  notAnswered: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    this.questionForm = this.fb.group({
      questiontext: ['', Validators.required],
      questionType: ['Text'],
      optionAns: this.fb.array([
        this.createOptionFormGroup()
      ])
    });
    if (this.id != 0) {
      this.questionModel.id = this.id;
      this.baseService.GetDataById(this.id, "/GetQuestion").subscribe({
        next: (res) => {
          this.questionForm.get("questiontext")?.setValue(res.data?.questionText);
          this.questionForm.get("questionType")?.setValue(res.data?.questionType);
          const optionAnsArray = this.questionForm.get('optionAns') as FormArray;

          optionAnsArray.controls.forEach((optionControl, i) => {
            ((optionControl as FormGroup).get('id') as FormControl).setValue(res.data?.optionAns[i].id);
            ((optionControl as FormGroup).get('option') as FormControl).setValue(res.data?.optionAns[i].option);
            ((optionControl as FormGroup).get('isAns') as FormControl).setValue(res.data?.optionAns[i].isAns);
          });
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    
    (this.questionForm.get('questionType') as FormControl).valueChanges.subscribe(value => {
      this.adjustOptionAns(value);
    });

    this.questionForm.valueChanges.subscribe({
      next: (res) => {
        this.questionModel.questionText = res.questiontext;
        this.questionModel.questionType = res.questionType;
        this.questionModel.optionAns = res.optionAns;
      }
    });
  }
  adjustOptionAns(questionType: string) {
    const optionAnsArray = this.questionForm.get('optionAns') as FormArray;
    const expectedLength = questionType === 'Text' ? 1 : 4;
  
    while (optionAnsArray.length !== 0) {
      optionAnsArray.removeAt(0);
    }

    for (let i = 0; i < expectedLength; i++) {
      optionAnsArray.push(this.createOptionFormGroup());
    }
    this.questionForm.updateValueAndValidity();
  }

  get options(): FormGroup[] {
    return (this.questionForm.get('optionAns') as FormArray).controls as FormGroup[];
  }

  createOptionFormGroup(): FormGroup {
    return this.fb.group({
      id: [0],
      option: ['', Validators.required],
      isAns: [false]
    });
  }

  getOptionControl(index: number): FormControl {
    return this.options[index].get('isAns') as FormControl;
  }
  onRadioChange(index: number) {
    const optionsArray = this.questionForm.get('optionAns') as FormArray;
    optionsArray.controls.forEach((optionControl, i) => {
      if (i !== index) {
        ((optionControl as FormGroup).get('isAns') as FormControl).setValue(false);
      }
    });
    (this.options[index].get('isAns') as FormControl).setValue(true);
  }
  isQuestionAnswered(){
    if(this.questionForm.value.questionType != "Text"){
      const optionsArray = this.questionForm.get('optionAns') as FormArray;
      let answered = false;
      optionsArray.controls.forEach((optionControl, i) => {
        if(((optionControl as FormGroup).get('isAns') as FormControl).value == true){
          answered = true;
        }
      });
      if(!answered){
        this.notAnswered = true;
      }
    }
    return this.notAnswered;
  }
  questionAnsValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.questionForm && this.questionForm.value.questionType === 'Text' && !control.value) {
        return { 'required': true };
      }
      return null;
    };
  }

  SaveData() {
    const fields = document.querySelectorAll('.form-submitted');
    fields.forEach(f => {
      f.classList.remove('form-submitted');
    })
    if(this.questionForm.valid && !this.isQuestionAnswered()){
      this.service.SaveData(this.questionModel).subscribe({
        next: (res) => {
          if(res.success){
            const errorFields = document.querySelectorAll('.error-ul');
            errorFields.forEach(f => {
              f.classList.add('form-submitted');
            })
              this.router.navigate(['admin']);
          }
          this._snackbar.open(res.message, "ok", {
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
  }
}
