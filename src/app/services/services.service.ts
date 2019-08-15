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
  /**
   * GetRolesProcess
   */
  public GetRolesProcess(id: string) {
    return this.httpClient.get<any>(this.url + '/api/m/processes/' + id + '/roles');
  }
  public GetStepsProcess(id: string) {
    return this.httpClient.get<any>(this.url + '/api/m/processes/' + id + '/steps');
  }
  /**
   * Add step to process
   */
  public AddStepProcess(idProcess: string, steps: string) {
    return this.httpClient.post(this.url + '/api/m/processes/' + idProcess + '/steps', { step: steps });
  }
  /**
   * Add role to process
   */
  public AddRolProcess(idProcess: string, rol: string) {
    return this.httpClient.post(this.url + '/api/m/processes/' + idProcess + '/roles', { role: rol });
  }
  /**
 * Update role to process
 */
  public UpdateRolProcess(idProcess: string, idRol: string, nombrerol: string) {
    ///api/m/processes/{process}/roles/{role}
    return this.httpClient.put(this.url + '/api/m/processes/' + idProcess + '/roles/' + idRol, { name: nombrerol });
  }
}
