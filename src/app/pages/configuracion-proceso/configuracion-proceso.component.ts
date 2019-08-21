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
        //this.steps = response;
        //console.log("this.steps: ", this.steps);
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
        let self = this;
        this.steps = this.steps.map(function (variable, index, array) {
          if (self.stepsProcess.find((elem: any) => elem.typeStep == variable.step._id)) {
            variable.status = true;
          }
          return variable
        });
      },
      error => {
        console.log("error: ", error);
      });
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
  configStep(idStep: string, nameStep: string) {
    this.router.navigate(['procesos/' + this.idProcess + '/step/' + idStep + '/' + nameStep + '/configuracion/']);
  }
  configRol(idRol: string, id) {
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

}
