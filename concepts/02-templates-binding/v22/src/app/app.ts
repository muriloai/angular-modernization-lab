import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlowRegulator } from './flow-regulator';

@Component({
  selector: 'app-root',
  imports: [FormsModule, FlowRegulator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Sinais de estado (Signals) para dados reativos no template
  readonly pivoNome = signal('Pivô Central 03 (Setor Norte)');
  readonly cultura = signal('Soja Safra 2026');
  readonly vazaoLitrosHora = signal(1200);
  readonly operador = signal('Mariana Souza');
  readonly modoManual = signal(true);
  readonly observacao = signal('');

  // Sinal computado (computed):
  // Recalcula apenas quando o sinal vazaoLitrosHora for alterado (memoizado)
  readonly pressaoBar = computed(() => {
    return Number((this.vazaoLitrosHora() * 0.00267).toFixed(2));
  });

  readonly statusAlerta = computed(() => {
    return this.vazaoLitrosHora() > 2000;
  });

  alternarModo(): void {
    this.modoManual.update(ativo => !ativo);
  }

  redefinirVazao(): void {
    this.vazaoLitrosHora.set(1000);
  }

  atualizarObservacao(texto: string): void {
    this.observacao.set(texto);
  }
}
