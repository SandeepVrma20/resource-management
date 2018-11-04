import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDetails } from './loginDetails';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/api/user';
  
  constructor(private httpClient: HttpClient) { }

  createUser(loginDetails: LoginDetails): Observable<Object> {
     alert('inside services' + loginDetails.employeeId + 'url :- ' + this.baseUrl+ '/insert');
    return this.httpClient.post(this.baseUrl + '/insert', loginDetails);
  }

  getUserByEmpId(loginDetails: LoginDetails): Observable<any> {
     return this.httpClient.post(this.baseUrl  +'/employeeId', loginDetails);
  }

}
