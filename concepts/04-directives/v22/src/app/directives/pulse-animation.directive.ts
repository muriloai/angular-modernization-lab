import { Directive, input, signal } from '@angular/core';

@Directive({
  selector: '[appPulseAnimation]',
  // Aplica classe de animação com base no valor do signal de entrada
  host: {
    '[class.animacao-pulso]': 'ativo()'
  }
})
export class PulseAnimationDirective {
  readonly animar = input(true);
  readonly pulsoManual = signal(true);

  ativo(): boolean {
    return this.animar() && this.pulsoManual();
  }

  alternar(): void {
    this.pulsoManual.update(v => !v);
  }
}
