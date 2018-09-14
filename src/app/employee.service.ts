import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/api/employees';

  constructor(private httpClient: HttpClient) { }

  getEmployee(id: number): Observable<Object> {
    return this.httpClient.get('${this.baseUrl}/${id}');
  }

  createEmployee(employees: Object): Observable<Object> {
    alert('inside services' + employees + 'url :- ' + '${this.baseUrl}' + '/insert');
    return this.httpClient.post('${this.baseUrl}' + '/insert', employees);
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

}
