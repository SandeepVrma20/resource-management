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
import {AuthGuard} from './auth.guard';
import { LogoutComponent } from './logout/logout.component';

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
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'home/customFilter/:filterType',
    component: HomeComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'home/domainWise/:filterType',
    component: HomeComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'home/ownerWise/:filterType',
    component: HomeComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'home/projectWise/:filterType',
    component: HomeComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'home/monthWise/:filterType',
    component: HomeComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'listdetails',
    component: ListDetailsComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'newreq',
    component: RegisterRequirementComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'editreq/:reqId/:filterType',
    component: UpdateRequirementsComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'listdetails/:filterValue/:filterType',
    component: ListDetailsComponent,
    canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
