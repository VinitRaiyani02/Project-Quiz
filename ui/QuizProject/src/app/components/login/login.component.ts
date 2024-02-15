import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InputFieldProps } from 'src/app/models/forms/InputFieldsProps';
import { UserService } from 'src/app/services/user.service';
import { UserRole } from 'src/app/shared/enums/userrole.enum';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,private service: UserService,private _snackbar:MatSnackBar,private tokenService: TokenService){
    
  }
  loginForm: FormGroup = new FormGroup('');
  inputEmailProps: InputFieldProps = {
    ControlName: 'email',
    Type: 'email',
    Label: 'Email',
    IsDisabled: false,
    PlaceHolder: 'email'
  }
  inputPasswordProps: InputFieldProps = {
    ControlName: 'password',
    Type: 'password',
    Label: 'Password',
    IsDisabled: false,
    PlaceHolder: 'Password'
  }

  ngOnInit(): void {
    let btnid = document.getElementById("logoutbtn");
    if(btnid != null){
      btnid.style.display = "none";
    }
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    sessionStorage.clear();
  }

  onSubmit() {
    const fields = document.querySelectorAll('.form-submitted');
    fields.forEach(f => {
      f.classList.remove('form-submitted');
    })
    if (this.loginForm.valid) {
      sessionStorage.clear();
      this.service.Login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (res) => {
          if (res.success) {
            const errorFields = document.querySelectorAll('.error-ul');
            errorFields.forEach(f => {
              f.classList.add('form-submitted');
            })
            if (res.data != undefined) {
              
              sessionStorage.setItem("token", res.data.token);
              this.tokenService.setToken();
              let role = this.tokenService.getUserRole();
              sessionStorage.setItem('role',role);
              if (role == UserRole.User) {
                this.router.navigate(['user']);
              }
              else if (role == UserRole.Admin) {
                this.router.navigate(['admin']);
              }
            }
          }
          this._snackbar.open(res.message, "ok", {
            duration: 1500,
            verticalPosition: "top",
            horizontalPosition: "right"
          })
        }
      });
    }
  }
}
