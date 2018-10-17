import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { RegisterRequirementComponent } from './register-requirement/register-requirement.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'listdetails',
    component: ListDetailsComponent
  },
  {
    path: 'newreq',
    component: RegisterRequirementComponent
  },
  {
    path: 'editreq/:reqId',
    component: RegisterRequirementComponent
  },
  {
    path: 'listdetails/:mainSkill',
    component: ListDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
