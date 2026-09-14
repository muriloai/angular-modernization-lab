import { Component, Input } from '@angular/core';
import { AgroSensor } from '../models/sensor.model';

@Component({
  selector: 'app-sensor-tag',
  templateUrl: './sensor-tag.component.html',
  styleUrls: ['./sensor-tag.component.css']
})
export class SensorTagComponent {
  @Input() sensor!: AgroSensor;

  destacado = false;

  destacar(): void {
    this.destacado = true;
  }

  limparDestaque(): void {
    this.destacado = false;
  }

  alternarStatus(): void {
    this.sensor.ativo = !this.sensor.ativo;
  }
}
