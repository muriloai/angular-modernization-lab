import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-flow-regulator',
  templateUrl: './flow-regulator.component.html',
  styleUrls: ['./flow-regulator.component.css']
})
export class FlowRegulatorComponent {
  // Entrada vinda do componente pai
  @Input() vazao = 0;

  // Emissor nomeado obrigatoriamente com o sufixo Change para permitir two-way binding [(vazao)]
  @Output() vazaoChange = new EventEmitter<number>();

  incrementar(): void {
    this.vazao += 100;
    this.vazaoChange.emit(this.vazao);
  }

  decrementar(): void {
    if (this.vazao >= 100) {
      this.vazao -= 100;
      this.vazaoChange.emit(this.vazao);
    }
  }

  alterarManualmente(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valorNumerico = Number(input.value);
    if (!isNaN(valorNumerico) && valorNumerico >= 0) {
      this.vazao = valorNumerico;
      this.vazaoChange.emit(this.vazao);
    }
  }
}
