import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-configuracion-steps',
  templateUrl: './configuracion-steps.component.html',
  styleUrls: ['./configuracion-steps.component.scss']
})
export class ConfiguracionStepsComponent implements OnInit {

  idProcess: any;
  idStep: any;
  nameStep: string;
  roles: any;
  formStepProcess = [];
  permissions = [];
  typedata: any;

  constructor(
    private services: ServicesService,
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
    //console.log("this.idStep", this.idStep);
    //console.log("this.idProceso", this.idProcess);
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
      },
      error => {
        console.log("error:", error);

      }
    )
    //console.log(this.permissions);
    this.services.GetTypeDataStepsProcess().subscribe(
      response => {
        //console.log("response", response);
        this.typedata = response;
      },
      error => {
        console.log("error:", error);

      }
    )
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
    this.formStepProcess.splice(id, 1)
  }
  changeState(id: number, idtable: number, name: string) {
    this.formStepProcess[id].permissions[idtable][name] = !this.formStepProcess[id].permissions[idtable][name];
  }
  registerFieldStep() {
    let dataForm = this.clone(this.formStepProcess)
    for (let i in dataForm) {
      for (let j in dataForm[i].permissions)
        delete dataForm[i].permissions[j].nameRole
    }
    //console.log(JSON.stringify(dataForm));
    for (let i in dataForm) {
      this.services.AddFieldToStep(this.idStep, dataForm[i]).subscribe(
        response => {
          console.log("Good: ",response);
          
        },
        error => {
          console.log("error AddFieldToStep: ",error);
          
        }
      )
    }
  }
  volver() {
    this.router.navigate(['procesos/' + this.idProcess + '/configuracion/']);
  }

}
