import { Component, input, output } from '@angular/core';

// No Angular 22 com Zoneless, não é necessário configurar ChangeDetectionStrategy.OnPush.
// Todo componente baseado em Signals atualiza exclusivamente os nós de template afetados.
@Component({
  selector: 'app-pivo-card',
  templateUrl: './pivo-card.html',
  styleUrl: './pivo-card.css'
})
export class PivoCard {
  readonly nome = input.required<string>();
  readonly setor = input.required<string>();
  readonly angulo = input.required<number>();
  readonly vazao = input.required<number>();
  readonly ativo = input.required<boolean>();

  readonly statusAlterado = output<void>();

  alternarStatus(): void {
    this.statusAlterado.emit();
  }
}
