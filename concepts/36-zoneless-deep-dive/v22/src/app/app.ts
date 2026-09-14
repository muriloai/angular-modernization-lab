import { Component, signal, computed, effect, OnDestroy } from '@angular/core';

interface PivotTelemetry {
  id: string;
  name: string;
  angle: number;
  pressure: number;
  flowRate: number;
  status: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnDestroy {
  title = signal('Fazenda Santa Maria - Telemetria em Alta Frequência (v22 - Zoneless)');

  pivot = signal<PivotTelemetry>({
    id: 'PIVOT-01',
    name: 'Pivô Central Talhão Norte',
    angle: 45.0,
    pressure: 3.2,
    flowRate: 180.5,
    status: 'Operação Estável (Zoneless)'
  });

  telemetryTicks = signal(0);
  isRunning = signal(false);

  // Derivação reativa computada diretamente de Signals
  waterConsumptionTotal = computed(() => {
    return Number((this.pivot().flowRate * (this.telemetryTicks() * 0.02)).toFixed(2));
  });

  private timerId: any = null;

  constructor() {
    this.startTelemetry();
  }

  ngOnDestroy(): void {
    this.stopTelemetry();
  }

  startTelemetry(): void {
    if (this.isRunning()) return;
    this.isRunning.set(true);

    // No Angular 22 Zoneless, timers regulares de browser não poluem nenhuma zona.
    // O agendamento de renderização ocorre apenas quando o signal é atualizado,
    // através de microtarefas diretas do engine do Angular.
    this.timerId = setInterval(() => {
      this.telemetryTicks.update(t => t + 1);
      const currentTicks = this.telemetryTicks();

      this.pivot.update(prev => ({
        ...prev,
        angle: Number(((prev.angle + 0.1) % 360).toFixed(1)),
        pressure: Number((3.0 + Math.sin(currentTicks / 10) * 0.4).toFixed(2)),
        flowRate: Number((180 + Math.cos(currentTicks / 10) * 15).toFixed(1))
      }));
    }, 20);
  }

  stopTelemetry(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.isRunning.set(false);
  }

  resetCounters(): void {
    this.telemetryTicks.set(0);
  }
}
