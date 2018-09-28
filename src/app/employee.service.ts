import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeDetails } from './employeeDetails';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/api/employees';
  private requirementUrl = 'http://localhost:8080/api/requierments';

  constructor(private httpClient: HttpClient) { }

  getEmployee(id: number): Observable<Object> {
    return this.httpClient.get('${this.baseUrl}/${id}');
  }

  createEmployee(employee: EmployeeDetails, fileData: FormData): Observable<Object> {
    const abc = { 'empDetails': employee, 'fileData': fileData };
    alert('inside services' + employee + 'url :- ' + '${this.baseUrl}' + '/insert');
    return this.httpClient.post('${this.baseUrl}' + '/insert', abc);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.httpClient.put('${this.baseUrl}/${id}', value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete('${this.baseUrl}/${id}', { responseType: 'text' });
  }

  getEmployeesList(): Observable<any> {
    return this.httpClient.get('${this.baseUrl}');
  }

  getRequirementList(): Observable<any> {
    return this.httpClient.get('${this.requirementUrl}');
  }

}
