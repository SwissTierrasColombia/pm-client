import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ManageServicesService } from 'src/app/services/m/manage-services.service';
@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss']
})
export class ProcesosComponent implements OnInit {
  listaprocesos = true;
  process = []
  nomProcessCreate: string;
  constructor(
    private services: ManageServicesService,
    private toastr: ToastrService,
    private route: Router
  ) { }

  ngOnInit() {
    this.services.GetProcesos().subscribe(
      response => {
        for (let i in response) {
          this.process.push({
            'process': response[i]
          })
        }
        //console.log("response get this.procesos: ", this.process);
      },
      error => {
        console.log("Error al obtener los procesos", error);
      }
    );
  }

  viewProcess() {
    this.listaprocesos = false;
  }
  CreateProcess() {
    this.services.CreateProcess(this.nomProcessCreate).subscribe(
      data => {
        this.process.push({ 'process': data });
        this.listaprocesos = true;
        this.toastr.success("Haz registrado el proceso: " + this.nomProcessCreate)
      },
      error => {
        this.toastr.error("No se registro el proceso")
      }
    );
  }
  volver() {
    this.listaprocesos = true;
  }
  ConfigProcess(id: string) {
    this.route.navigate(['procesos/' + id + '/configuracion/']);
  }
  deleteProcess(idProcess: string, id) {
    this.services.RemoveaProcess(idProcess).subscribe(
      paramName => {
        this.toastr.success("Se a eliminado un proceso")
        this.process.splice(id, 1);
      }, error => {
        this.toastr.error("Error al eliminar un proceso")
      });
  }

}
