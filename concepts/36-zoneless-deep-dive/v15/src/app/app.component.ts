import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef, DoCheck } from '@angular/core';

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
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, DoCheck {
  title = 'Fazenda Santa Maria - Telemetria em Alta Frequência (v15 - Zone.js)';

  pivot: PivotTelemetry = {
    id: 'PIVOT-01',
    name: 'Pivô Central Talhão Norte',
    angle: 45.0,
    pressure: 3.2,
    flowRate: 180.5,
    status: 'Operação Normal'
  };

  telemetryTicks = 0;
  zoneCheckCycles = 0;
  isRunning = false;
  useOutsideZone = false;

  private timerId: any = null;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.startTelemetry();
  }

  ngDoCheck(): void {
    this.zoneCheckCycles++;
  }

  ngOnDestroy(): void {
    this.stopTelemetry();
  }

  toggleOutsideZone(): void {
    const wasRunning = this.isRunning;
    this.stopTelemetry();
    this.useOutsideZone = !this.useOutsideZone;
    if (wasRunning) {
      this.startTelemetry();
    }
  }

  startTelemetry(): void {
    if (this.isRunning) return;
    this.isRunning = true;

    if (this.useOutsideZone) {
      // Otimização necessária no Angular 15 para escapar do Zone monkey-patch
      this.ngZone.runOutsideAngular(() => {
        this.timerId = setInterval(() => {
          this.telemetryTicks++;
          this.updateMetrics();

          // Necessário sincronizar manualmente de tempos em tempos
          if (this.telemetryTicks % 10 === 0) {
            this.cdr.detectChanges();
          }
        }, 20);
      });
    } else {
      // Modo padrão com Zone.js ativo: cada setInterval dispara um ciclo global de detecção
      this.timerId = setInterval(() => {
        this.telemetryTicks++;
        this.updateMetrics();
      }, 20);
    }
  }

  stopTelemetry(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.isRunning = false;
  }

  resetCounters(): void {
    this.telemetryTicks = 0;
    this.zoneCheckCycles = 0;
  }

  private updateMetrics(): void {
    this.pivot.angle = Number(((this.pivot.angle + 0.1) % 360).toFixed(1));
    this.pivot.pressure = Number((3.0 + Math.sin(this.telemetryTicks / 10) * 0.4).toFixed(2));
    this.pivot.flowRate = Number((180 + Math.cos(this.telemetryTicks / 10) * 15).toFixed(1));
  }
}
