import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GetTypesCallback } from 'src/app/interface/get-types-callback';

@Injectable({
  providedIn: 'root'
})
export class ParameterizationServicesService {
  url: string = environment.back_mongo;
  constructor(private httpClient: HttpClient) { }
  //P/Steps
  /**
* GetSteps
*/
  public GetSteps() {
    return this.httpClient.get<any>(this.url + '/api/p/steps');
  }
  //fin P/Steps

  //P/Domains
  /**
   * Get types data
   */
  public GetTypeDataStepsProcess() {
    return this.httpClient.get<any>(this.url + '/api/p/domains/types-data');

  }
  /**
   * Get Types Callbacks
   */
  public GetTypesCallbacks() {
    return this.httpClient.get<GetTypesCallback>(this.url + '/api/p/domains/types-callback')
  }
  /**
   * Get Types Operators
   */
  public GetTypesOperators() {
    return this.httpClient.get<any>(this.url + '/api/p/domains/types-operator')
  }
}
