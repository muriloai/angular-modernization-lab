import { Component, Type, computed, signal } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { PluviometroWidget } from '../widgets/pluviometro-widget';
import { TermohigrometroWidget } from '../widgets/termohigrometro-widget';
import { AnemometroWidget } from '../widgets/anemometro-widget';

interface WidgetOption {
  id: string;
  label: string;
  component: Type<any>;
  dados: { localizacao: string; valorPrincipal: string };
}

@Component({
  selector: 'app-widgets-host',
  imports: [CommonModule, NgComponentOutlet],
  templateUrl: './widgets-host.html',
  styleUrls: ['./widgets-host.css']
})
export class WidgetsHost {
  readonly opcoes: WidgetOption[] = [
    {
      id: 'pluvio',
      label: 'Pluviômetro Digital',
      component: PluviometroWidget,
      dados: { localizacao: 'Pivô 04 - Soja Safra', valorPrincipal: '45.2 mm' }
    },
    {
      id: 'termo',
      label: 'Termohigrômetro de Dossel',
      component: TermohigrometroWidget,
      dados: { localizacao: 'Talhão 08 - Baixada', valorPrincipal: '27.9°C / 66%' }
    },
    {
      id: 'vento',
      label: 'Anemômetro de Pulverização',
      component: AnemometroWidget,
      dados: { localizacao: 'Base Operacional Sul', valorPrincipal: '11.4 km/h (Leste)' }
    }
  ];

  readonly widgetAtivoId = signal<string>('pluvio');

  // Tipo do componente derivado reativamente por Signal
  readonly widgetSelecionado = computed(() => {
    const encontrada = this.opcoes.find(o => o.id === this.widgetAtivoId());
    return encontrada ? encontrada.component : PluviometroWidget;
  });

  // Mapa de inputs passado de forma declarativa e reativa para o NgComponentOutlet
  readonly widgetInputs = computed(() => {
    const encontrada = this.opcoes.find(o => o.id === this.widgetAtivoId());
    return encontrada ? encontrada.dados : {};
  });

  selecionarWidget(id: string): void {
    this.widgetAtivoId.set(id);
  }
}
