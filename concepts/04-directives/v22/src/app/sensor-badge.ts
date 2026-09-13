import { Component, input } from '@angular/core';
import { SensorAlertDirective } from './directives/sensor-alert.directive';
import { PulseAnimationDirective } from './directives/pulse-animation.directive';

@Component({
  selector: 'app-sensor-badge',
  templateUrl: './sensor-badge.html',
  styleUrl: './sensor-badge.css',
  // Directive Composition API:
  // O componente incorpora diretamente as diretivas no host
  // e expõe suas entradas com alias amigáveis para o consumidor
  hostDirectives: [
    {
      directive: SensorAlertDirective,
      inputs: ['nivelAlerta: nivel']
    },
    {
      directive: PulseAnimationDirective,
      inputs: ['animar: pulsar']
    }
  ]
})
export class SensorBadge {
  readonly nome = input.required<string>();
  readonly tipo = input.required<string>();
  readonly valor = input.required<string>();
}
