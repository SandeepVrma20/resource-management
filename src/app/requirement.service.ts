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
    // alert('inside services' + requirementDetails.eucRefId + 'url :- ' + this.baseUrl+ '/insert');
    return this.httpClient.post(this.baseUrl + '/insert', requirementDetails);
  }

  updateRequirement(requirementDetails: RequirementDetails): Observable<Object> {
    return this.httpClient.post(this.baseUrl + '/update', requirementDetails);
  }

  deleteRequirement(id: number): Observable<any> {
    return this.httpClient.delete('${this.baseUrl}/${id}', { responseType: 'text' });
  }

  getGrpRequirement(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/grouped', { responseType: 'text' });
  }

  getRequirementBySkill(requirementDetails:String): Observable<any> {
    return this.httpClient.get(this.baseUrl +'/retrieve/skillCategory/'+requirementDetails, { responseType: 'text' });
  }

  getRequirementList(): Observable<any> {
    return this.httpClient.get(this.baseUrl , { responseType: 'text' });
  }

  getRequirementListById(id: String): Observable<any> {
    return this.httpClient.get(this.baseUrl  +'/id/'+id, { responseType: 'text' });
  }

}
