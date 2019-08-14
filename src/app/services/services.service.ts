import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url: string = environment.back_mongo;
  constructor(private httpClient: HttpClient) { }
  /**
   * GetProcesos
   */
  public GetProcesos() {
    return this.httpClient.get<any>(this.url + '/api/m/processes');
  }
  /**
 * GetSteps
 */
  public GetSteps() {
    return this.httpClient.get<any>(this.url + '/api/p/steps');
  }
  /**
   * CreateProcess
   */
  public CreateProcess(nombre: string) {
    return this.httpClient.post(this.url + '/api/m/processes', { processName: nombre });

  }

}
