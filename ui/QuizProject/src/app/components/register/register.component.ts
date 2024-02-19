import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ISelectOptions, InputFieldProps, genderSelectOptions } from 'src/app/models/forms/InputFieldsProps';
import { UserModel } from 'src/app/models/user.model';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';
import { StrongPasswordRegx } from 'src/app/shared/constants/RegExp.const';
import { Genders } from 'src/app/shared/enums/gender.enum';
import { IDeactivateComponent } from 'src/app/shared/guards/form.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, IDeactivateComponent {
constructor(private languageService: LanguageService,private userService: UserService,private router: Router,
  private _snackbar: MatSnackBar){

}
  inputUserNameProps: InputFieldProps = {
    ControlName: 'userName',
    Type: 'text',
    Label: 'UserName',
    IsDisabled: false,
    PlaceHolder: 'UserName'
  }
  inputEmailProps: InputFieldProps = {
    ControlName: 'email',
    Type: 'email',
    Label: 'Email',
    IsDisabled: false,
    PlaceHolder: 'Email'
  }

  inputGenderProps: InputFieldProps = {
    ControlName: 'gender',
    Type: '',
    Label: 'Gender',
    IsDisabled: false,
    PlaceHolder: 'gender',
    SelectOptions: genderSelectOptions
  }
  inputLanguageProps: InputFieldProps = {
    ControlName: 'language',
    Type: '',
    Label: 'Language',
    IsDisabled: false,
    PlaceHolder: 'Language',
    SelectOptions: []
  }
  inputPasswordProps: InputFieldProps = {
    ControlName: 'password',
    Type: 'password',
    Label: 'Password',
    IsDisabled: false,
    PlaceHolder: 'Password'
  }

  registerForm: FormGroup = new FormGroup('');
  userData: UserModel = {
    id: 0,
    userName: '',
    email: '',
    gender: '',
    languageid: 0,
    roleId: 0,
    password: '',
    isDeleted: false
  }

  ngOnInit(): void {
    this.languageService.GetLanguageList().subscribe({
      next: (res: ISelectOptions[]) => {
        this.inputLanguageProps.SelectOptions = res;
      },
      error: (err) => {
      
      }
    });

    this.registerForm = new FormGroup({
      userName: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      gender: new FormControl(Genders.Male,Validators.required),
      language: new FormControl('1',Validators.required),
      password: new FormControl('',[Validators.required,Validators.pattern(StrongPasswordRegx)])
    })

    this.registerForm.valueChanges.subscribe({
      next: (value) => {
        this.userData.userName = value.userName;
        this.userData.email = value.email;
        this.userData.gender = value.gender;
        this.userData.languageid = value.language;
        this.userData.password = value.password;
      }
    })
  }
  canGoBack(){
    if(this.userData.userName || this.userData.email ||this.userData.password){
      return confirm('are you sure you want to go back?');
    }
    return true;
  }
  SaveData() {
    const fields = document.querySelectorAll('.form-submitted');
    fields.forEach(f => {
      f.classList.remove('form-submitted');
    })
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('userName', this.userData.userName);
      formData.append('password', this.userData.password);
      formData.append('email', this.userData.email);
      formData.append('gender', this.userData.gender);
      formData.append('languageid', this.userData.languageid.toString());
      this.userService.SaveData(formData).subscribe({
        next: (res) => {
          if (res.success) {
            const errorFields = document.querySelectorAll('.error-ul');
            errorFields.forEach(f => {
              f.classList.add('form-submitted');
            })
            this.registerForm.reset();
            this.router.navigate(['']);
          }
          this._snackbar.open(res.message, "ok", {
            duration: 1500,
            verticalPosition: "top",
            horizontalPosition: "right"
          })
        }
      })
    }
  }

}
