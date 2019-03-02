import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDetails } from './loginDetails';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/api/user';

  private loggedInStatus=JSON.parse(localStorage.getItem('loggedIn') || 'false');;
  //private loggedInStatus=false;
    setLoggedIn(value:boolean){
    this.loggedInStatus=value;
    localStorage.setItem('loggedIn','true');
   }
 
   getIsLoggedIn(){
     //return this.loggedInStatus;
     return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
   }
  
  constructor(private httpClient: HttpClient) { }

  createUser(loginDetails: LoginDetails): Observable<Object> {
     return this.httpClient.post(this.baseUrl + '/insert', loginDetails);
  }

  getUserByEmpId(loginDetails: LoginDetails): Observable<any> {
     return this.httpClient.post(this.baseUrl  +'/employeeId', loginDetails);
  }

  forgetPwd(loginDetails: LoginDetails): Observable<Object> {
     return this.httpClient.post(this.baseUrl + '/changePassword', loginDetails);
 }

}
