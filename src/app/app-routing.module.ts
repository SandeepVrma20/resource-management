import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { RegisterRequirementComponent } from './register-requirement/register-requirement.component';
import { LoginComponent } from './login/login.component';
import { UpdateRequirementsComponent } from './update-requirements/update-requirements.component';
import {SignUpComponent } from './sign-up/sign-up.component';
import {ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'forgetPwd',
    component: ForgetPasswordComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home/customFilter/:filterType',
    component: HomeComponent
  },
  {
    path: 'home/domainWise/:filterType',
    component: HomeComponent
  },
  {
    path: 'home/ownerWise/:filterType',
    component: HomeComponent
  },
  {
    path: 'home/projectWise/:filterType',
    component: HomeComponent
  },
  {
    path: 'home/monthWise/:filterType',
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
    component: UpdateRequirementsComponent
  },
  {
    path: 'listdetails/:filterValue/:filterType',
    component: ListDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
