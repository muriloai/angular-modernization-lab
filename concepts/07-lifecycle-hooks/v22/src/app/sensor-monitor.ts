import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  signal,
  viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

// No Angular 22, não é necessário implementar interfaces de lifecycle (OnInit, OnDestroy)
@Component({
  selector: 'app-sensor-monitor',
  templateUrl: './sensor-monitor.html',
  styleUrl: './sensor-monitor.css'
})
export class SensorMonitor {
  readonly sensorId = input('SNS-AGRO-701');
  readonly frequenciaSegundos = input(3);

  readonly painelRef = viewChild<ElementRef<HTMLDivElement>>('painelStatus');

  readonly leituraAtual = signal(45);
  readonly totalLeituras = signal(0);
  readonly logs = signal<string[]>([]);

  // DestroyRef injetado diretamente substitui o método ngOnDestroy e subjects manuais
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.adicionarLog('Construtor: Inicializando monitor e registrando ciclos.');

    // afterNextRender executa com segurança apenas no navegador após o DOM estar pronto
    afterNextRender(() => {
      this.adicionarLog('afterNextRender: Elementos renderizados com segurança.');
      const painel = this.painelRef();
      if (painel) {
        painel.nativeElement.style.borderLeftColor = '#2563eb';
      }
    });

    // Callback de destruição registrado de forma declarativa
    this.destroyRef.onDestroy(() => {
      console.log('[v22] DestroyRef.onDestroy: Recursos e timers liberados automaticamente.');
    });

    // effect() substitui o antigo ngOnChanges com rastreamento automático de Signals
    effect(() => {
      const freq = this.frequenciaSegundos();
      this.adicionarLog(`effect: Taxa de leitura configurada para ${freq}s.`);
    });

    // Subscrição com cancelamento automático ao destruir o componente
    interval(3000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.totalLeituras.update(total => total + 1);
        this.leituraAtual.set(Math.round(35 + Math.random() * 25));
        this.adicionarLog(`Coleta #${this.totalLeituras()}: Umidade em ${this.leituraAtual()}%.`);
      });
  }

  private adicionarLog(msg: string): void {
    const hora = new Date().toLocaleTimeString('pt-BR');
    this.logs.update(atuais => [`[${hora}] ${msg}`, ...atuais.slice(0, 4)]);
  }
}
