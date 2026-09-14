import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { AgroSensor } from '../models/sensor.model';
import { SensorTagComponent } from './sensor-tag.component';

@Component({
  selector: 'app-sensors-board',
  templateUrl: './sensors-board.component.html',
  styleUrls: ['./sensors-board.component.css']
})
export class SensorsBoardComponent implements AfterViewInit, OnDestroy {
  // Consulta de elemento único do DOM
  @ViewChild('filtroInput', { static: false }) filtroInputRef!: ElementRef<HTMLInputElement>;

  // Consulta de múltiplos componentes filhos via QueryList
  @ViewChildren(SensorTagComponent) tagComponents!: QueryList<SensorTagComponent>;

  private sub?: Subscription;

  totalComponentesEncontrados = 0;
  totalAtivos = 0;
  termoBusca = '';

  sensores: AgroSensor[] = [
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
  ];

  ngAfterViewInit(): void {
    // No Angular 15, as referências de @ViewChild e @ViewChildren só estão prontas após AfterViewInit
    this.atualizarMetricas();

    // Reatividade clássica através do evento changes do QueryList
    this.sub = this.tagComponents.changes.subscribe(() => {
      this.atualizarMetricas();
    });
  }

  focarCampoBusca(): void {
    // Manipulação direta do elemento nativo via ElementRef
    if (this.filtroInputRef) {
      this.filtroInputRef.nativeElement.focus();
    }
  }

  destacarTodos(): void {
    // Invocação em lote de métodos dos componentes filhos capturados pelo QueryList
    this.tagComponents.forEach(tag => tag.destacar());
  }

  limparDestaques(): void {
    this.tagComponents.forEach(tag => tag.limparDestaque());
  }

  adicionarNovoSensor(): void {
    const proximoNumero = this.sensores.length + 1;
    const novo: AgroSensor = {
      id: `SNS-0${proximoNumero}`,
      nome: `Sensor de Copa e Dossel ${proximoNumero}`,
      talhao: 'Talhão 02 - Algodão',
      tipo: 'Temperatura',
      valor: '26.1°C',
      ativo: true
    };
    this.sensores.push(novo);
  }

  removerUltimo(): void {
    if (this.sensores.length > 0) {
      this.sensores.pop();
    }
  }

  private atualizarMetricas(): void {
    this.totalComponentesEncontrados = this.tagComponents ? this.tagComponents.length : 0;
    this.totalAtivos = this.sensores.filter(s => s.ativo).length;
  }

  ngOnDestroy(): void {
    // Prevenção de vazamento de memória com a subscrição do QueryList
    this.sub?.unsubscribe();
  }
}
