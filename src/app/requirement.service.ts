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
     return this.httpClient.post(this.baseUrl + '/insert', requirementDetails);
  }

  updateRequirement(requirementDetails: RequirementDetails): Observable<Object> {
    return this.httpClient.put(this.baseUrl + '/update' , requirementDetails);
  }

  deleteRequirement(id: number): Observable<any> {
    return this.httpClient.delete('${this.baseUrl}/${id}', { responseType: 'text' });
  }

  getGrpRequirement(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/grouped', { responseType: 'text' });
  }

  getRequirementByFilterType(filterType:String,filterValue:String): Observable<any> {
     return this.httpClient.get(this.baseUrl +'/retrieve/filterType/'+filterType +'/filterValue/'+filterValue, { responseType: 'text' });
  }
 
  getRequirementList(): Observable<any> {
    return this.httpClient.get(this.baseUrl , { responseType: 'text' });
  }

  getRequirementListById(id: String): Observable<any> {
    return this.httpClient.get(this.baseUrl  +'/id/'+id, { responseType: 'text' });
  }

  getAutoPopulateData():Observable<any> {
    return this.httpClient.get(this.baseUrl + '/autoFilled',{responseType:'text'});
  }

  getGrpRequirementByDomain(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/domainwise', { responseType: 'text' });
  }
  
  getGrpRequirementByProject(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/projectwise', { responseType: 'text' });
  }

  getGrpRequirementByOwner(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/ownerwise', { responseType: 'text' });
  }

  getRequirementByCustomFilter(requirementDetails: RequirementDetails):Observable<any>{
    return this.httpClient.put(this.baseUrl + '/customDates' , requirementDetails);
  }

  getGrpRequirementByMonth(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/monthwise', { responseType: 'text' });
  }

}
