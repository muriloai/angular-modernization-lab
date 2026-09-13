import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface PivoModel {
  codigo: string;
  setor: string;
  areaHectares: number | null;
  vazaoM3h: number | null;
  emailResponsavel: string;
  operacaoNoturna: boolean;
}

@Component({
  selector: 'app-pivo-form',
  templateUrl: './pivo-form.component.html',
  styleUrls: ['./pivo-form.component.css']
})
export class PivoFormComponent {
  modelo: PivoModel = {
    codigo: 'PIVO-04',
    setor: 'Gleba Sul: Soja e Milho',
    areaHectares: 120,
    vazaoM3h: 380,
    emailResponsavel: 'irrigacao@agrosantamaria.com.br',
    operacaoNoturna: true
  };

  submetidoComSucesso = false;
  dadosUltimoEnvio: PivoModel | null = null;

  cadastrar(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.submetidoComSucesso = true;
    this.dadosUltimoEnvio = { ...this.modelo };

    setTimeout(() => {
      this.submetidoComSucesso = false;
    }, 5000);
  }

  resetarForm(form: NgForm): void {
    form.resetForm({
      codigo: '',
      setor: '',
      areaHectares: null,
      vazaoM3h: null,
      emailResponsavel: '',
      operacaoNoturna: false
    });
    this.dadosUltimoEnvio = null;
    this.submetidoComSucesso = false;
  }
}
