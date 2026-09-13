import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

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
  imports: [FormsModule, JsonPipe],
  templateUrl: './pivo-form.html',
  styleUrls: ['./pivo-form.css']
})
export class PivoForm {
  // Modelo inicial de dados para o formulário dirigido a template
  readonly modelo: PivoModel = {
    codigo: 'PIVO-04',
    setor: 'Gleba Sul: Soja e Milho',
    areaHectares: 120,
    vazaoM3h: 380,
    emailResponsavel: 'irrigacao@agrosantamaria.com.br',
    operacaoNoturna: true
  };

  readonly submetidoComSucesso = signal(false);
  readonly dadosUltimoEnvio = signal<PivoModel | null>(null);

  cadastrar(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.submetidoComSucesso.set(true);
    this.dadosUltimoEnvio.set({ ...this.modelo });

    setTimeout(() => {
      this.submetidoComSucesso.set(false);
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
    this.dadosUltimoEnvio.set(null);
    this.submetidoComSucesso.set(false);
  }
}
