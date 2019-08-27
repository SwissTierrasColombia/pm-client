import { Component, OnInit } from '@angular/core';
import { ManageServicesService } from 'src/app/services/m/manage-services.service';
import { ParameterizationServicesService } from 'src/app/services/p/parameterization-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetTypesCallback } from '../../../interface/get-types-callback';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  formRulesStepProcess: any;
  idStep: string;
  nameStep: string;
  idProcess: string;
  idStepSelect: any;
  allFieldStep: any;
  typeOperaators: any;
  allstepsSelect: any;
  allCallback: GetTypesCallback;
  steps = [];
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
        this.nameStep = response.nameStep;
        this.idProcess = response.idProceso;
        //console.log("route response", response);
      }
    );
    this.servicesp.GetTypesCallbacks().subscribe(
      response => {
        this.allCallback = response
        //console.log(this.allCallback);
      },
      error => {
        console.log(error);

      }
    )
    let promiseForm = new Promise((resolve, reject) => {
      this.services.GetStepsProcess(this.idProcess).subscribe(
        response => {
          this.allstepsSelect = response;
          //console.log("this.allstepsSelect: ", this.allstepsSelect);
          this.idStepSelect = this.allstepsSelect.find((item) => {
            return item.typeStep == this.idStep;
          })

          if (this.idStepSelect) {
            this.services.GetFieldsFromStep(this.idStepSelect._id).subscribe(
              response => {
                this.allFieldStep = response;
                //console.log("this.idStepSelect: ", this.idStepSelect);
                resolve()
              }, error => {
                console.log(error);
              }
            )
          }
          this.servicesp.GetSteps().subscribe(
            response => {
              for (let i in response) {
                this.steps.push({
                  "step": response[i],
                  "status": false
                })
              }
              //console.log("this.steps: ", this.steps);

            },
            error => {
              console.log("error: ", error);
            }

          );
        }, error => {
          console.log("error obteniendo los pasos de procesos: ", error);

        }
      )
    });
    Promise.all([promiseForm]).then(values => {
      if (this.idStepSelect.rules.length > 0) {
        //console.log("this.idStepSelect.rules: ", this.idStepSelect.rules);

        this.formRulesStepProcess = this.idStepSelect.rules;
      } else {
        this.formRulesStepProcess = [
          {
            "conditions": [
              {}
            ],
            "callbacks": [
              {}
            ],
          }
        ]
      }
      //console.log("this.formRulesStepProcess: ", this.formRulesStepProcess);
      let self = this;
      this.steps = this.steps.map(function (variable, index, array) {
        if (self.allstepsSelect.find((elem: any) => elem.typeStep == variable.step._id)) {
          variable.status = true;
        }
        return variable
      });
      this.steps = this.steps.filter(item => item.status == true);
      console.log(this.steps);


    });
    this.servicesp.GetTypesOperators().subscribe(
      data => {
        this.typeOperaators = data;
        //console.log(this.typeOperaators);

      },
      error => {
        console.log("error typeOperaators: ", error);

      }
    )
  }
  clone(obj: Object) {
    return JSON.parse(JSON.stringify(obj))
  }
  volver() {
    this.router.navigate(['procesos/' + this.idProcess + '/configuracion/']);
  }
  addNewRule() {
    this.formRulesStepProcess.push({
      "conditions": [
        {}
      ],
      "callbacks": [
        {}
      ],
    });
  }
  addNewConditions(idOut: number) {
    this.formRulesStepProcess[idOut].conditions.push({});
  }
  addNewCallback(idOut: number) {
    this.formRulesStepProcess[idOut].callbacks.push({});
  }
  deleteRule(idOut: number) {
    this.formRulesStepProcess.splice(idOut, 1);
  }
  deleteConditions(idOut: number, idin: number) {
    this.formRulesStepProcess[idOut].conditions.splice(idin, 1);
  }
  deleteCallback(idOut: number, idin: number) {
    this.formRulesStepProcess[idOut].callbacks.splice(idin, 1);
  }

}
