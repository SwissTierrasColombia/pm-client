import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManageServicesService } from 'src/app/services/m/manage-services.service';
import { ParameterizationServicesService } from 'src/app/services/p/parameterization-services.service';

@Component({
  selector: 'app-configuracion-steps',
  templateUrl: './configuracion-steps.component.html',
  styleUrls: ['./configuracion-steps.component.scss']
})
export class ConfiguracionStepsComponent implements OnInit {

  idProcess: any;
  idStep: any;
  idStepSelect: any;
  nameStep: string;
  roles: any;
  formStepProcess = [];
  permissions = [];
  typedata: any;
  allstepsSelect: any;

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
        this.idStep = response.idStep;
        this.idProcess = response.idProceso;
        this.nameStep = response.nameStep;
        //console.log("route response", response);
      }
    );
    this.servicesp.GetTypeDataStepsProcess().subscribe(
      response => {
        //console.log("response", response);
        this.typedata = response;
      },
      error => {
        console.log("error:", error);

      }
    )
    let promiseForm = new Promise((resolve, reject) => {
      this.services.GetStepsProcess(this.idProcess).subscribe(
        response => {
          this.allstepsSelect = response;
          this.idStepSelect = this.allstepsSelect.find((item) => {
            return item.typeStep == this.idStep;
          })
          if (this.idStepSelect) {
            this.services.GetFieldsFromStep(this.idStepSelect._id).subscribe(
              response => {
                let aux = response.filter(item => {
                  return item.isPrivate === false;
                })
                //console.log(aux);

                this.formStepProcess = aux;
                for (let i in this.formStepProcess) {
                  this.formStepProcess[i].type = this.formStepProcess[i].typeData._id;
                }
                resolve()
              }, error => {
                console.log(error);
              }
            )
          }
          //console.log("this.idStepSelect: ", this.idStepSelect);

        }, error => {
          console.log("error obteniendo los pasos de procesos: ", error);

        }
      )
    });

    Promise.all([promiseForm]).then(values => {
      this.services.GetRolesProcess(this.idProcess).subscribe(
        response => {
          //console.log("response", response);
          this.roles = response;
          for (let i in this.roles) {
            //console.log(this.roles[i]);
            this.permissions.push({
              "role": this.roles[i]._id,
              "nameRole": this.roles[i].role,
              "create": false,
              "read": false,
              "update": false,

            })
          }
          for (let i in this.formStepProcess) {
            for (let y in this.formStepProcess[i].permissions) {
              this.formStepProcess[i].permissions[y].nameRole = this.roles[y].role
            }
          }
        },
        error => {
          console.log("error:", error);

        }
      );
    });
  }
  clone(obj: Object) {
    return JSON.parse(JSON.stringify(obj))
  }

  createFieldStepProcess() {
    this.formStepProcess.push({
      "permissions": this.clone(this.permissions)
    })
  }
  deleteFieldStepProcess(id: number) {

    //console.log(this.formStepProcess[id]);
    this.services.RemoveFieldFromStep(this.idStepSelect._id, this.formStepProcess[id]._id).subscribe(
      response => {
        this.toastr.success("Haz eliminado un campo")
        this.formStepProcess.splice(id, 1)
      },
      error => {
        this.toastr.success("No se elimino el campo")
        console.log("No se elimino el campo: ", error);

      }
    )
  }
  changeState(id: number, idtable: number, name: string) {
    this.formStepProcess[id].permissions[idtable][name] = !this.formStepProcess[id].permissions[idtable][name];
  }
  registerFieldStep() {
    let dataForm = this.clone(this.formStepProcess)
    let promise = [];
    for (let i in dataForm) {
      if (!dataForm[i].hasOwnProperty('_id')) {
        let AddFieldToStepPromise = new Promise((resolve, reject) => {
          this.services.AddFieldToStep(this.idStepSelect._id, dataForm[i]).subscribe(
            response => {
              resolve()
            },
            error => {
              //console.log("error AddFieldToStep: ", error);


            }
          )
        });
        promise.push(AddFieldToStepPromise)
      } else {
        let UpdateFieldToStepPromise = new Promise((resolve, reject) => {
          this.services.UpdateFieldFromStep(this.idStepSelect._id, dataForm[i]._id, dataForm[i]).subscribe(
            response => {
              //console.log("Good Update: ", response);
              resolve()
            },
            error => {
              console.log("error UpdateFieldToStep: ", error);

            }
          )
        });
        promise.push(UpdateFieldToStepPromise)
      }
    }
    Promise.all(promise).then(values => {
      setTimeout(function () { window.location.reload(); }, 1000);
      this.toastr.success("Información guardada.");
    });

  }
  volver() {
    this.router.navigate(['procesos/' + this.idProcess + '/configuracion/']);
  }

}
