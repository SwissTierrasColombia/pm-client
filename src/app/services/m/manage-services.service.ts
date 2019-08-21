import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageServicesService {
  url: string = environment.back_mongo;
  constructor(private httpClient: HttpClient) { }

  /**
 * CreateProcess
 */
  public CreateProcess(nombre: string) {
    return this.httpClient.post(this.url + '/api/m/processes', { processName: nombre });
  }
  // INICIO M/Processes
  /**
  * GetProcesos
  */
  public GetProcesos() {
    return this.httpClient.get<any>(this.url + '/api/m/processes');
  }
  /**
  * Add role to process
  */
  public AddRolProcess(idProcess: string, rol: string) {
    return this.httpClient.post(this.url + '/api/m/processes/' + idProcess + '/roles', { role: rol });
  }
  /**
  * GetRolesProcess
  */
  public GetRolesProcess(id: string) {
    return this.httpClient.get<any>(this.url + '/api/m/processes/' + id + '/roles');
  }
  /**
  * Update role to process
  */
  public UpdateRolProcess(idProcess: string, idRol: string, nombrerol: string) {
    return this.httpClient.put(this.url + '/api/m/processes/' + idProcess + '/roles/' + idRol, { name: nombrerol });
  }

  /**
   * Add step to process
   */
  public AddStepProcess(idProcess: string, steps: string) {
    return this.httpClient.post(this.url + '/api/m/processes/' + idProcess + '/steps', { step: steps });
  }
  /**
   * Get steps from process
   */
  public GetStepsProcess(id: string) {
    return this.httpClient.get<any>(this.url + '/api/m/processes/' + id + '/steps');
  }

  /**
   * Add variable to process
   */
  public AddVariableToProcess(idProcess: string) {
    return this.httpClient.post(this.url + '/api/m/processes/' + idProcess + '/variables', {})
  }

  // FIN M/Processes


  //INICIO M/Steps

  /**
   * Add Field To Step
   */
  public AddFieldToStep(idstep: string, formData: any) {
    let data = formData
    //console.log("data: ", data);
    return this.httpClient.post(this.url + '/api/m/steps/' + idstep + '/fields', data);
  }

  /**
   * Get Fields From Step
   */
  public GetFieldsFromStep(idstep: string) {
    return this.httpClient.get<any>(this.url + '/api/m/steps/' + idstep + '/fields')
  }
  /**
   * Update Field From Step
   */
  public UpdateFieldFromStep(idStep: string, idField: string, formData: any) {
    let data = formData
    //console.log("data: ", data);
    return this.httpClient.put(this.url + '/api/m/steps/' + idStep + '/fields/' + idField, data)
  }
  /**
   * Remove Field From Step
   */
  public RemoveFieldFromStep(idStep: string, idField: string) {
    return this.httpClient.delete(this.url + '/api/m/steps/' + idStep + '/fields/' + idField)
  }
  /**
   * Add Rule To Step
   */
  public AddRuleToStep(idStep: string) {
    return this.httpClient.post(this.url + '/api/m/steps/' + idStep + '/rules', {})
  }
  /**
   * Remove To Step
   */
  public RemoveToStep(idStep: string, idRule: string) {
    return this.httpClient.delete(this.url + '/api/m/steps/' + idStep + '/rules/' + idRule)
  }
  //FIN M/Steps
}