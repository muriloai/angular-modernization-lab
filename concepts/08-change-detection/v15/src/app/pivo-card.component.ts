import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

// No Angular 15, OnPush protege o componente contra varreduras redundantes do Zone.js
@Component({
  selector: 'app-pivo-card',
  templateUrl: './pivo-card.component.html',
  styleUrls: ['./pivo-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PivoCardComponent {
  @Input() nome = '';
  @Input() setor = '';
  @Input() angulo = 0;
  @Input() vazao = 0;
  @Input() ativo = false;

  private contagemCiclos = 0;

  constructor(private cd: ChangeDetectorRef) {}

  // Getter avaliado no template para mensurar quantas vezes o componente foi verificado
  get ciclosVerificacao(): number {
    this.contagemCiclos++;
    return this.contagemCiclos;
  }

  alternarStatus(): void {
    this.ativo = !this.ativo;
    // No OnPush, alterações manuais fora do fluxo de @Input exigem notificar o Angular
    this.cd.markForCheck();
  }
}
