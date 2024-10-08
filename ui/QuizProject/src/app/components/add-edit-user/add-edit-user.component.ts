import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISelectOptions, InputFieldProps, genderSelectOptions } from 'src/app/models/forms/InputFieldsProps';
import { SnackbarConfig } from 'src/app/models/snackbar-config';
import { SnackbarMessageModel, success } from 'src/app/models/snackbarmsg.model';
import { UserModel } from 'src/app/models/user.model';
import { BaseService } from 'src/app/services/base.service';
import { HelperService } from 'src/app/services/helper.service';
import { LanguageService } from 'src/app/services/language.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StrongPasswordRegx } from 'src/app/shared/constants/RegExp.const';
import { apiPathForImage } from 'src/app/shared/constants/apipath.const';
import { Genders } from 'src/app/shared/enums/gender.enum';
import { UserRole } from 'src/app/shared/enums/userrole.enum';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  constructor(private languageService: LanguageService, private baseService: BaseService<FormData, UserModel>,
    private router: Router, private route: ActivatedRoute, private helperService: HelperService,
    private snackbarService: SnackbarService,private location: Location) {
      
  }
  inputImageProps: InputFieldProps = {
    ControlName: 'userImage',
    Type: '',
    Label: 'upload Image here',
    IsDisabled: false,
    PlaceHolder: 'image',
    accept: 'image/*'
  }
  inputUserNameProps: InputFieldProps = {
    ControlName: 'userName',
    Type: 'text',
    Label: 'Name',
    IsDisabled: false,
    PlaceHolder: 'Name'
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
  inputRoleProps: InputFieldProps = {
    ControlName: 'role',
    Type: '',
    Label: 'Role',
    IsDisabled: false,
    PlaceHolder: 'role',
    SelectOptions: [
      { disabled: false, selected: false, text: 'Admin', value: UserRole.Admin },
      { disabled: false, selected: false, text: 'User', value: UserRole.User }
    ]
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
  userForm: FormGroup = new FormGroup('');
  imgFile: File | null = null;
  user: UserModel = {
    id: 0,
    userName: '',
    email: '',
    gender: Genders.Male,
    languageid: 0,
    roleId: UserRole.Admin,
    password: '',
    isDeleted: false
  }
  id: number = 0;
  imagePath: string = "";
  role: string = '';
  success:SnackbarMessageModel = success;
  snackbarConfig: SnackbarConfig = {
    message: '',
    duration: 2000
  }

  ngOnInit(): void {
    this.languageService.GetLanguageList().subscribe({
      next: (res: ISelectOptions[]) => {
        this.inputLanguageProps.SelectOptions = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
    let role = sessionStorage.getItem('role');
    if (role != null) {
      this.role = role;
    }

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id != 0) {
      this.baseService.GetDataById(this.id, "/GetUser").subscribe({
        next: (res) => {
          if (res.success && res.data != undefined) {
            if (res.data?.userImgPath != undefined) {
              this.imagePath = apiPathForImage + res.data?.userImgPath;
            }
            this.userForm.get("userName")?.setValue(res.data?.userName);
            this.userForm.get("email")?.setValue(res.data?.email);
            this.userForm.get("gender")?.setValue(res.data?.gender);
            this.userForm.get("role")?.setValue(res.data?.roleId);
            this.userForm.get("language")?.setValue(res.data?.languageid);
            this.userForm.get("password")?.setValue("Demoo@123");
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    }


    this.userForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl(Genders.Male, Validators.required),
      role: new FormControl(UserRole.Admin, Validators.required),
      language: new FormControl('1', Validators.required),
      password: new FormControl('', [Validators.required, Validators.pattern(StrongPasswordRegx)]),
      userImage: new FormControl(null)
    });

    this.userForm.valueChanges.subscribe({
      next: (val) => {
        this.user.userName = val.userName;
        this.user.password = val.password;
        this.user.email = val.email;
        this.user.gender = val.gender;
        this.user.roleId = val.role;
        this.user.languageid = val.language;

      }
    })
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imgFile = file;
      this.imagePath = URL.createObjectURL(file);
    }
  }
  SaveUser() {
    const fields = document.querySelectorAll('.form-submitted');
    fields.forEach(f => {
      f.classList.remove('form-submitted');
    })

    if (this.imgFile != null) {
      this.user.userImage = this.imgFile;
    }
    if (this.userForm.valid) {
      const formData = new FormData();
      formData.append('id', this.id.toString());
      formData.append('userName', this.user.userName);
      formData.append('password', this.user.password);
      formData.append('email', this.user.email);
      formData.append('gender', this.user.gender);
      if (this.user.userImage != undefined) {
        formData.append('userImage', this.user.userImage);
      }
      formData.append('roleId', this.user.roleId.toString());
      formData.append('languageid', this.user.languageid.toString());
      this.baseService.SaveData(formData, "/User").subscribe({
        next: (res) => {
          if (res.success) {
            const errorFields = document.querySelectorAll('.error-ul');
            errorFields.forEach(f => {
              f.classList.add('form-submitted');
            })
            this.helperService.GetValues();
            if (this.role == '1') {
              this.router.navigate(['admin', 'userlist']);
            }
            else {
              this.router.navigate(['user']);
            }
          }
          this.snackbarConfig.message = res.message;
          this.snackbarConfig.status = res.success ? 'success' : 'error';
          this.snackbarService.show(this.snackbarConfig);
        },
        error: (error) => {
          console.log(error);
        }
      })

    }
  }
  Cancle(){
    this.location.back();  
  }
}
