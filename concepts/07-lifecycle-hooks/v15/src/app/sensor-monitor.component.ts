import {
  Component,
  Input,
  OnInit,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  SimpleChanges,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// No Angular 15, os ciclos de vida exigem implementar interfaces explícitas
@Component({
  selector: 'app-sensor-monitor',
  templateUrl: './sensor-monitor.component.html',
  styleUrls: ['./sensor-monitor.component.css']
})
export class SensorMonitorComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() sensorId = 'SNS-AGRO-701';
  @Input() frequenciaSegundos = 3;

  @ViewChild('painelStatus') painelRef!: ElementRef<HTMLDivElement>;

  // Boilerplate obrigatório no Angular 15 para evitar vazamento de memória com RxJS
  private readonly destroy$ = new Subject<void>();

  leituraAtual = 45;
  totalLeituras = 0;
  logs: string[] = [];

  ngOnInit(): void {
    this.adicionarLog('ngOnInit: Componente montado e rotina de telemetria iniciada.');
    this.iniciarTimer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['frequenciaSegundos'] && !changes['frequenciaSegundos'].firstChange) {
      this.adicionarLog(`ngOnChanges: Frequência alterada para ${this.frequenciaSegundos}s.`);
      this.reiniciarTimer();
    }
  }

  ngAfterViewInit(): void {
    this.adicionarLog('ngAfterViewInit: Elementos do DOM renderizados.');
    if (this.painelRef) {
      this.painelRef.nativeElement.style.borderLeftColor = '#16a34a';
    }
  }

  ngOnDestroy(): void {
    console.log('[v15] ngOnDestroy: Cancelando timer e liberando subscrições RxJS.');
    this.destroy$.next();
    this.destroy$.complete();
  }

  private iniciarTimer(): void {
    interval(this.frequenciaSegundos * 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.totalLeituras++;
        this.leituraAtual = Math.round(35 + Math.random() * 25);
        this.adicionarLog(`Coleta #${this.totalLeituras}: Umidade em ${this.leituraAtual}%.`);
      });
  }

  private reiniciarTimer(): void {
    this.destroy$.next();
    this.iniciarTimer();
  }

  private adicionarLog(msg: string): void {
    const hora = new Date().toLocaleTimeString('pt-BR');
    this.logs.unshift(`[${hora}] ${msg}`);
    if (this.logs.length > 5) {
      this.logs.pop();
    }
  }
}
