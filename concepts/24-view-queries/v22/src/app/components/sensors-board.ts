import { Component, ElementRef, computed, signal, viewChild, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgroSensor } from '../models/sensor.model';
import { SensorTag } from './sensor-tag';

@Component({
  selector: 'app-sensors-board',
  imports: [CommonModule, FormsModule, SensorTag],
  templateUrl: './sensors-board.html',
  styleUrls: ['./sensors-board.css']
})
export class SensorsBoard {
  // Consulta de elemento nativo obrigatório do DOM retornando Signal
  readonly filtroInput = viewChild.required<ElementRef<HTMLInputElement>>('filtroInput');

  // Consulta reativa a todas as instâncias de componentes filhos retornando Signal<readonly SensorTag[]>
  readonly tags = viewChildren(SensorTag);

  readonly termoBusca = signal('');

  readonly sensores = signal<AgroSensor[]>([
    {
      id: 'SNS-01',
      nome: 'Sonda TDR Perfil Solo',
      talhao: 'Talhão 04 - Pivô Norte',
      tipo: 'Umidade do Solo',
      valor: '68.5%',
      ativo: true
    },
    {
      id: 'SNS-02',
      nome: 'Estação Microclimática',
      talhao: 'Talhão 08 - Baixada',
      tipo: 'Temperatura',
      valor: '23.4°C',
      ativo: true
    },
    {
      id: 'SNS-03',
      nome: 'Tensiómetro Eletrônico',
      talhao: 'Talhão 11 - Sede',
      tipo: 'Tensão Hídrica',
      valor: '35.0 kPa',
      ativo: false
    }
  ]);

  // Derivação reativa pura e automática a partir do Signal de viewChildren
  readonly totalComponentesEncontrados = computed(() => {
    return this.tags().length;
  });

  readonly totalAtivos = computed(() => {
    return this.tags().filter(t => t.sensor().ativo).length;
  });

  focarCampoBusca(): void {
    this.filtroInput().nativeElement.focus();
  }

  destacarTodos(): void {
    for (const tag of this.tags()) {
      tag.destacar();
    }
  }

  limparDestaques(): void {
    for (const tag of this.tags()) {
      tag.limparDestaque();
    }
  }

  adicionarNovoSensor(): void {
    const proximoNumero = this.sensores().length + 1;
    const novo: AgroSensor = {
      id: `SNS-0${proximoNumero}`,
      nome: `Sensor de Copa e Dossel ${proximoNumero}`,
      talhao: 'Talhão 02 - Algodão',
      tipo: 'Temperatura',
      valor: '26.1°C',
      ativo: true
    };
    this.sensores.update(atuais => [...atuais, novo]);
  }

  removerUltimo(): void {
    if (this.sensores().length > 0) {
      this.sensores.update(atuais => atuais.slice(0, -1));
    }
  }
}
