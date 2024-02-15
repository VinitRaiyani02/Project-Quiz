import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddEditQuestionComponent } from 'src/app/components/add-edit-question/add-edit-question.component';

const routes: Routes = [{ path: '', component: AdminComponent },
{path: 'addQuestion', component: AddEditQuestionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
