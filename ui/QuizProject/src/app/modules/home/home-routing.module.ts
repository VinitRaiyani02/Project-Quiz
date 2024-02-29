import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { formGuard } from 'src/app/shared/guards/form.guard';
import { LoginComponent } from 'src/app/components/login/login.component';

const routes: Routes = [
  {path:'', component: HomeComponent,children: [
    {path: '',component: LoginComponent},
    {path:'register',canDeactivate: [formGuard], component: RegisterComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
