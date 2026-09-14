import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgroSensor } from '../models/sensor.model';

@Component({
  selector: 'app-sensor-tag',
  imports: [CommonModule],
  templateUrl: './sensor-tag.html',
  styleUrls: ['./sensor-tag.css']
})
export class SensorTag {
  readonly sensor = input.required<AgroSensor>();
  readonly destacado = signal(false);

  destacar(): void {
    this.destacado.set(true);
  }

  limparDestaque(): void {
    this.destacado.set(false);
  }

  alternarStatus(): void {
    this.sensor().ativo = !this.sensor().ativo;
  }
}
