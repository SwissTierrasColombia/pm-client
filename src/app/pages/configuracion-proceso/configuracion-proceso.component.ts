import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManageServicesService } from 'src/app/services/m/manage-services.service';
import { ParameterizationServicesService } from 'src/app/services/p/parameterization-services.service';

@Component({
  selector: 'app-configuracion-proceso',
  templateUrl: './configuracion-proceso.component.html',
  styleUrls: ['./configuracion-proceso.component.scss']
})
export class ConfiguracionProcesoComponent implements OnInit {
  idProcess: any;
  tab = 1;
  steps = [];
  roles: any;
  stepsProcess: any;
  nomRolCreate: any;
  actualizarRol = false;
  idRolupdate: string;
  allstepsSelect: any;
  idStepSelect: any;
  actualizarVariable = false;
  variables: any;
  nomVariableCreate: string;
  valorVariableCreate: string;
  idVariableupdate: string;
  actualizarUsuario = false;
  firstName: string;
  lastName: string;
  username: string;
  usuarios: any;
  constructor(
    private services: ManageServicesService,
    private servicesp: ParameterizationServicesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (response: any) => {
        this.idProcess = response.idProceso
      }
    );
    this.servicesp.GetSteps().subscribe(
      response => {
        for (let i in response) {
          this.steps.push({
            "step": response[i],
            "status": false
          })
        }
      },
      error => {
        console.log("error: ", error);

      }

    );
    this.services.GetRolesProcess(this.idProcess).subscribe(
      response => {
        this.roles = response;
        //console.log("this.roles: ", this.roles);

      },
      error => {
        console.log("error: ", error);

      }
    );
    this.services.GetStepsProcess(this.idProcess).subscribe(
      response => {
        this.stepsProcess = response;
        console.log("stepsProcess: ", this.stepsProcess);

        let self = this;
        this.steps = this.steps.map(function (variable, index, array) {
          if (self.stepsProcess.find((elem: any) => elem.typeStep._id == variable.step._id)) {
            variable.status = true;
          }
          return variable
        });
      },
      error => {
        console.log("error: ", error);
      });
    this.services.GetVariablesFromProcess(this.idProcess).subscribe(
      response => {
        this.variables = response;
      }, error => {
        console.log("error Get Variables: ", error);

      }
    )
  }

  addVariableProcess() {
    let data = {
      "process": this.idProcess,
      "variable": this.nomVariableCreate,
      "value": this.valorVariableCreate
    }
    this.services.AddVariableToProcess(this.idProcess, data).subscribe(
      Response => {
        this.variables = Response;
        this.toastr.success("Se a registrado la variable al proceso.")
      },
      error => {
        this.toastr.error("No se pudo añadir la variable al proceso.")
      }
    )
    this.nomVariableCreate = '';
    this.valorVariableCreate = '';
  }

  configVariable(idvariable: string, id: number) {
    this.actualizarVariable = true;
    this.nomVariableCreate = this.variables[id].variable;
    this.valorVariableCreate = this.variables[id].value;
    this.idVariableupdate = idvariable;
  }
  updateVariableProcess() {
    let data = {
      "process": this.idProcess,
      "variable": this.idVariableupdate,
      "name": this.nomVariableCreate,
      "value": this.valorVariableCreate
    }
    this.services.UpdateVariablesFromProcess(this.idProcess, this.idVariableupdate, data).subscribe(
      data => {
        this.variables = data;
        this.toastr.success("Haz Actualizado la variable: " + this.nomVariableCreate);
        this.nomVariableCreate = "";
        this.idVariableupdate = "";
        this.valorVariableCreate = "";
        this.actualizarVariable = false;
      },
      error => {
        this.toastr.error("No se Actualizo el rol");
      }
    );
  }
  deleteVariable(idVariable: string, id: number) {
    this.services.RemoveVariableFromProcess(this.idProcess, idVariable).subscribe(
      response => {
        this.toastr.success("Haz Eliminado una variable");
        this.variables.splice(id, 1)
      }, error => {
        this.toastr.error("No se Elimino la variable");
      }
    )
  }
  clone(obj: Object) {
    return JSON.parse(JSON.stringify(obj))
  }
  addColorstep(id: number) {
    if (this.steps[id].status) {
      this.steps[id].status = false;
    } else {
      this.steps[id].status = true
    }
  }
  addstepsProcess() {
    let auxSteps = this.steps.filter(step => step.status == true)
    // console.log(auxSteps);
    let self = this
    auxSteps.map(function (variable) {
      self.services.AddStepProcess(self.idProcess, variable.step._id).subscribe(
        data => {
          self.toastr.success("Haz registrado el step: " + variable.step.step);
        },
        error => {
        }
      );
    });
  }
  configStep(idStep: string, nameStep: string, id) {
    console.log(this.stepsProcess[id]);
    if (this.steps[id].status) {
      this.addstepsProcess();
      this.router.navigate(['procesos/' + this.idProcess + '/step/' + idStep + '/' + nameStep + '/configuracion/']);
    } else {
      this.toastr.info("Al parecer no haz agregado este paso al proceso", "Por favor agregalo primero.")
    }

  }
  configRules(idStep: string, nameStep: string, id) {
    console.log(this.stepsProcess[id]);
    if (this.steps[id].status) {
      this.addstepsProcess();
      this.router.navigate(['procesos/' + this.idProcess + '/step/' + idStep + '/' + nameStep + '/config/rules']);
    } else {
      this.toastr.info("Al parecer no haz agregado este paso al proceso", "Por favor agregalo primero.")
    }

  }
  deleteStep(idstepOne: string, idColor: number) {
    let id = idstepOne
    this.steps[idColor].status = false
    this.services.GetStepsProcess(this.idProcess).subscribe(
      response => {
        this.allstepsSelect = response;
        this.idStepSelect = this.allstepsSelect.find((item) => {
          return item.typeStep == id;
        })
        if (this.idStepSelect) {
          this.services.RemoveStepToProcess(this.idProcess, this.idStepSelect._id).subscribe(
            response => {
              this.toastr.success("Se a eliminado un Step");
            },
            error => {
              this.toastr.error("No se a podido eliminar el step");
            }
          );
        } else {
          this.toastr.show("Probablemente no a guardado ese Step, No se puede eliminar")
        }
      });
    this.idStepSelect = '';
  }
  configRol(idRol: string, id: number) {
    //console.log("idRol: ", idRol, " id: ", id);
    this.actualizarRol = true;
    this.nomRolCreate = this.roles[id].role
    this.idRolupdate = idRol;
    //this.updateRolProcess(this.idProcess, idRol, this.nomRolCreate);
  }
  deleteRol(idRol: string, id) {

    this.services.RemoveRoleFromProcess(this.idProcess, idRol).subscribe(
      response => {
        this.toastr.success("Haz Eliminado un rol");
        this.roles.splice(id, 1)
      }, error => {
        this.toastr.error("No se Elimino el rol");
      }
    )
  }
  updateRolProcess() {
    this.services.UpdateRolProcess(this.idProcess, this.idRolupdate, this.nomRolCreate).subscribe(
      data => {
        this.roles = data;
        this.toastr.success("Haz Actualizado el rol: " + this.nomRolCreate);
        this.nomRolCreate = "";
        this.idRolupdate = "";
        this.actualizarRol = false;
      },
      error => {
        this.toastr.error("No se Actualizo el rol");
      }
    );
  }
  addRolProcess() {
    this.services.AddRolProcess(this.idProcess, this.nomRolCreate).subscribe(
      data => {
        this.roles = data;
        this.toastr.success("Haz registrado el rol: " + this.nomRolCreate);
        this.nomRolCreate = "";
      },
      error => {
        this.toastr.error("No se registro el rol");
      }
    );
  }
  volver() {
    this.router.navigate(['procesos/']);
  }
  addUserProcess() {

  }
  updateUserProcess() {

  }
}
