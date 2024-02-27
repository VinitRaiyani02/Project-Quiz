import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddEditQuestionComponent } from 'src/app/components/add-edit-question/add-edit-question.component';
import { ShowUserListComponent } from 'src/app/components/show-user-list/show-user-list.component';
import { AddEditUserComponent } from 'src/app/components/add-edit-user/add-edit-user.component';
import { RolesListComponent } from 'src/app/components/roles-list/roles-list.component';

const routes: Routes = [{ path: '', component: AdminComponent },
{path: 'addQuestion', component: AddEditQuestionComponent},
{path: 'userlist',component: ShowUserListComponent},
{path: 'userlist',children:[
  {path: 'add-edit', component: AddEditUserComponent}
]},
{path: 'profile',component: AddEditUserComponent},
{path: 'roles', component: RolesListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
