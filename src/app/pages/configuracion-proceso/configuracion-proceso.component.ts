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
  userRoles: any;
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
      }

    );
    this.services.GetRolesProcess(this.idProcess).subscribe(
      response => {
        this.roles = response;
        this.userRoles = this.clone(this.roles)
        for (let i in this.userRoles) {
          this.userRoles[i].status = false;
        }
        //console.log("this.roles: ", this.roles);
      }
    );
    this.services.GetStepsProcess(this.idProcess).subscribe(
      response => {
        this.stepsProcess = response;
        //console.log("stepsProcess: ", this.stepsProcess);

        let self = this;
        this.steps = this.steps.map(function (variable, index, array) {
          if (self.stepsProcess.find((elem: any) => elem.typeStep._id == variable.step._id)) {
            variable.status = true;
          }
          return variable
        });
      });
    this.services.GetVariablesFromProcess(this.idProcess).subscribe(
      response => {
        this.variables = response;
      }
    )
    this.services.GetUsersToProcess(this.idProcess).subscribe(
      data => {
        this.usuarios = data;
        for (let i in this.usuarios) {
          for (let j in this.usuarios[i].roles) {
            this.usuarios[i].roles[j].status = true;
          }
        }
        console.log("this.usuarios: ", this.usuarios);

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
      }
    );
  }
  deleteVariable(idVariable: string, id: number) {
    this.services.RemoveVariableFromProcess(this.idProcess, idVariable).subscribe(
      response => {
        this.toastr.success("Haz Eliminado una variable");
        this.variables.splice(id, 1)
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
      }
    );
  }
  addRolProcess() {
    this.services.AddRolProcess(this.idProcess, this.nomRolCreate).subscribe(
      data => {
        this.roles = data;
        this.toastr.success("Haz registrado el rol: " + this.nomRolCreate);
        this.nomRolCreate = "";
      }
    );
  }
  volver() {
    this.router.navigate(['procesos/']);
  }
  configUser() {

  }
  deleteUser(idUser: string, i: number) {
    this.services.RemoveUserFromProcess(this.idProcess, idUser).subscribe(
      data => {
        this.toastr.success("Se a eliminado un usuario")
        this.usuarios.splice(i, 1)
      }
    )
  }
  addUserProcess() {
    let verificarRoles = this.clone(this.userRoles)
    verificarRoles = verificarRoles.filter(item => {
      return item.status === true;
    })
    let idROles = []
    for (let i in verificarRoles) {
      idROles.push(verificarRoles[i]._id)
    }
    //console.log(idROles);

    let data = {
      "firstName": this.firstName,
      "lastName": this.lastName,
      "username": this.username,
      "roles": idROles
    }
    this.services.AddUsersToProcess(this.idProcess, data).subscribe(
      data => {
        this.toastr.success("Se a registrado ", this.username);
        this.username = '';
        this.firstName = '';
        this.lastName = '';
        setTimeout(function () { window.location.reload(); }, 1000);
      }
    )
  }
  updateUserProcess() {

  }
}
