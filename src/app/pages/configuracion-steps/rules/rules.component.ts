import { Component, OnInit } from '@angular/core';
import { ManageServicesService } from 'src/app/services/m/manage-services.service';
import { ParameterizationServicesService } from 'src/app/services/p/parameterization-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetTypesCallback, TypeData } from '../../../interface/get-types-callback';
import { Typedata } from 'src/app/models/typedata';
import { Callbacks } from 'src/app/models/callbacks';

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
    private toastr: ToastrService,
    public typedata: Typedata,
    public callbacks: Callbacks
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
      }
    )
    let promiseForm = new Promise((resolve, reject) => {
      this.services.GetStepsProcess(this.idProcess).subscribe(
        response => {
          this.allstepsSelect = response;
          //console.log("this.allstepsSelect: ", this.allstepsSelect);
          this.idStepSelect = this.allstepsSelect.find((item) => {
            return item.typeStep._id == this.idStep;
          })

          if (this.idStepSelect) {
            this.services.GetFieldsFromStep(this.idStepSelect._id).subscribe(
              response => {
                this.allFieldStep = response;
                console.log("this.idStepSelect: ", this.idStepSelect._id);
                resolve()
              }
            )
          }
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
              {
                'metadata': {}
              }
            ],
          }
        ]
      }
      //console.log("this.formRulesStepProcess: ", this.formRulesStepProcess);


    });
    this.servicesp.GetTypesOperators().subscribe(
      data => {
        this.typeOperaators = data;
        //console.log(this.typeOperaators);

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
        {
          'metadata': {}
        }
      ],
    });
  }
  addNewConditions(idOut: number) {
    this.formRulesStepProcess[idOut].conditions.push({});
  }
  addNewCallback(idOut: number) {
    this.formRulesStepProcess[idOut].callbacks.push({ 'metadata': {} });
  }
  deleteRule(idOut: number) {
    let idRule = this.formRulesStepProcess[idOut]._id
    this.services.RemoveRuleToStep(this.idStepSelect._id, idRule).subscribe(
      response => {
        this.toastr.success("Se a eliminado correctamente la regla")
        this.formRulesStepProcess.splice(idOut, 1);
        setTimeout(function () { window.location.reload(); }, 1000);
      }
    )
    //this.formRulesStepProcess.splice(idOut, 1);
  }
  deleteConditions(idOut: number, idin: number) {
    this.formRulesStepProcess[idOut].conditions.splice(idin, 1);
  }
  deleteCallback(idOut: number, idin: number) {
    this.formRulesStepProcess[idOut].callbacks.splice(idin, 1);
  }
  modelChanged(idfiel, idOut, idInt) {
    //console.log("this.allFieldStep: ", this.allFieldStep);

    let aux = this.allFieldStep.find((item) => {
      return item._id == idfiel;
    })
    //console.log(aux.typeData._id);

    if (aux.typeData._id === this.typedata.CorreoElectronico) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typedata.CorreoElectronico
      //console.log("correo");
    }
    if (aux.typeData._id === this.typedata.Fecha) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typedata.Fecha
      //console.log("fecha");

    }
    if (aux.typeData._id === this.typedata.Numerico) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typedata.Numerico
      //console.log("numerico");

    }
    if (aux.typeData._id === this.typedata.Texto) {
      this.formRulesStepProcess[idOut].conditions[idInt].typeData = this.typedata.Texto
      //console.log("text");

    }

  }
  CreateRule() {
    let data = this.clone(this.formRulesStepProcess)
    for (let i in data) {
      this.services.AddRuleToStep(this.idStepSelect._id, data[i]).subscribe(
        response => {
          this.toastr.success("Se han registrado las reglas")
          setTimeout(function () { window.location.reload(); }, 1000);
        }
      )
    }
  }

}
