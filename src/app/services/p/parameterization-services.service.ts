import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParameterizationServicesService {
  url: string = environment.back_mongo;
  constructor(private httpClient: HttpClient) { }
  /**
* GetSteps
*/
  public GetSteps() {
    return this.httpClient.get<any>(this.url + '/api/p/steps');
  }
  /**
   * GetTypeDataStepsProcess
   */
  public GetTypeDataStepsProcess() {
    return this.httpClient.get<any>(this.url + '/api/p/domains/types-data');

  }
}
