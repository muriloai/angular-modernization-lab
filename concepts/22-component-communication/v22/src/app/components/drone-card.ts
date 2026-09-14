import { Component, computed, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Drone } from '../models/drone.model';

@Component({
  selector: 'app-drone-card',
  imports: [CommonModule],
  templateUrl: './drone-card.html',
  styleUrls: ['./drone-card.css']
})
export class DroneCard {
  // Entradas modernas baseadas em Signals
  readonly drone = input.required<Drone>();
  readonly modoOperacao = input<'manual' | 'automatico'>('automatico');

  // Two-way binding moderno via model() nativo do Angular 22
  readonly altitudeVoo = model<number>(15);

  // Saídas modernas desacopladas de RxJS EventEmitter
  readonly missaoIniciada = output<Drone>();
  readonly retornoBase = output<Drone>();
  readonly alertaEmergencia = output<string>();

  // Derivações reativas puras usando computed()
  readonly autonomiaMinutos = computed(() => {
    return Math.round((this.drone().bateriaPercentual / 100) * 35);
  });

  readonly nivelCriticoBateria = computed(() => {
    return this.drone().bateriaPercentual <= 20;
  });

  ajustarAltitude(delta: number): void {
    const atual = this.altitudeVoo();
    const novoValor = Math.max(5, Math.min(50, atual + delta));
    this.altitudeVoo.set(novoValor);
  }

  iniciarVoo(): void {
    if (this.nivelCriticoBateria()) {
      this.alertaEmergencia.emit(
        `Bloqueio de segurança no drone ${this.drone().id}: Carga insuficiente de bateria (${this.drone().bateriaPercentual}%).`
      );
      return;
    }
    this.missaoIniciada.emit(this.drone());
  }

  solicitarRetorno(): void {
    this.retornoBase.emit(this.drone());
  }
}
