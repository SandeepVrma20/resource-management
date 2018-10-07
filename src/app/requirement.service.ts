import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequirementDetails } from './requirementDetails';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {

  private baseUrl = 'http://localhost:8080/api/requirements';

  constructor(private httpClient: HttpClient) { }

  createRequirement(requirementDetails: RequirementDetails): Observable<Object> {
    //const abc = { 'empDetails': requirementDetails, 'fileData': fileData };
    alert('requirementUrl -->' + this.baseUrl + this.baseUrl);
    alert('inside services' + requirementDetails.eucRefId + 'url :- ' + this.baseUrl+ '/insert');
    return this.httpClient.post(this.baseUrl + '/insert', requirementDetails);
  }

  updateRequirement(id: number, value: any): Observable<Object> {
    return this.httpClient.put('${this.baseUrl}/${id}', value);
  }

  deleteRequirement(id: number): Observable<any> {
    return this.httpClient.delete('${this.baseUrl}/${id}', { responseType: 'text' });
  }

  getGrpRequirement(): Observable<any> {
    alert('inside services'  + 'url :- ' + this.baseUrl+ '/grouped');
    return this.httpClient.get(this.baseUrl + '/grouped', { responseType: 'text' });
  }

  getRequirementBySkill(requirementDetails: RequirementDetails): Observable<any> {
    alert('inside services' + requirementDetails.eucRefId + 'url :- ' + this.baseUrl+ '/retrieve');
    return this.httpClient.put(this.baseUrl +'/retrieve', { responseType: 'text' });
  }

  getRequirementList(): Observable<any> {
    return this.httpClient.get('${this.baseUrl}');
  }

}
