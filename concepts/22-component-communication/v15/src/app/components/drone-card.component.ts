import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Drone } from '../models/drone.model';

@Component({
  selector: 'app-drone-card',
  templateUrl: './drone-card.component.html',
  styleUrls: ['./drone-card.component.css']
})
export class DroneCardComponent {
  // Entradas clássicas com decorators @Input()
  @Input() drone!: Drone;
  @Input() modoOperacao: 'manual' | 'automatico' = 'automatico';

  // Two-way binding clássico (Banana-in-a-box) com par [altitudeVoo] e (altitudeVooChange)
  @Input() altitudeVoo: number = 15;
  @Output() altitudeVooChange = new EventEmitter<number>();

  // Eventos de saída com EventEmitter
  @Output() missaoIniciada = new EventEmitter<Drone>();
  @Output() retornoBase = new EventEmitter<Drone>();
  @Output() alertaEmergencia = new EventEmitter<string>();

  // Cálculo derivado imperativo no Angular 15
  get autonomiaMinutos(): number {
    if (!this.drone) return 0;
    return Math.round((this.drone.bateriaPercentual / 100) * 35);
  }

  get nivelCriticoBateria(): boolean {
    return !!this.drone && this.drone.bateriaPercentual <= 20;
  }

  ajustarAltitude(delta: number): void {
    const novoValor = Math.max(5, Math.min(50, this.altitudeVoo + delta));
    this.altitudeVoo = novoValor;
    this.altitudeVooChange.emit(this.altitudeVoo);
  }

  iniciarVoo(): void {
    if (this.nivelCriticoBateria) {
      this.alertaEmergencia.emit(`Bloqueio de voo no drone ${this.drone.id}: Bateria em nível crítico (${this.drone.bateriaPercentual}%).`);
      return;
    }
    this.missaoIniciada.emit(this.drone);
  }

  solicitarRetorno(): void {
    this.retornoBase.emit(this.drone);
  }
}
