import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserQuestionsComponent } from 'src/app/components/user-questions/user-questions.component';
import { ShowQuestionsAnsComponent } from 'src/app/components/show-questions-ans/show-questions-ans.component';
import { AddEditUserComponent } from 'src/app/components/add-edit-user/add-edit-user.component';

const routes: Routes = [{ path: '', component: UserComponent },
{path: 'quiz', component: UserQuestionsComponent},
{path: 'report', component: ShowQuestionsAnsComponent},
{path: 'profile',component: AddEditUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
