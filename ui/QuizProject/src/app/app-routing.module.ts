import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './modules/home/home.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { adminGuard, userGuard } from './shared/guards/auth.guard';

const routes: Routes = [{ path: '', loadChildren: () => HomeModule },
{ path: 'admin',canActivate: [adminGuard], loadChildren: () => AdminModule },
{ path: 'user',canActivate: [userGuard], loadChildren: () => UserModule },
{path:'**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
