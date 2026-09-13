import { Component, model } from '@angular/core';

@Component({
  selector: 'app-flow-regulator',
  templateUrl: './flow-regulator.html',
  styleUrl: './flow-regulator.css'
})
export class FlowRegulator {
  // Primitiva de two-way binding do Angular moderno:
  // A função model() cria automaticamente um sinal gravável com entrada e saída sincronizadas
  readonly vazao = model(0);

  incrementar(): void {
    this.vazao.update(valor => valor + 100);
  }

  decrementar(): void {
    this.vazao.update(valor => Math.max(0, valor - 100));
  }

  alterarManualmente(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valorNumerico = Number(input.value);
    if (!isNaN(valorNumerico) && valorNumerico >= 0) {
      this.vazao.set(valorNumerico);
    }
  }
}
