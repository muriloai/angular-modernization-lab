import { Component, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { PluviometroWidgetComponent } from '../widgets/pluviometro-widget.component';
import { TermohigrometroWidgetComponent } from '../widgets/termohigrometro-widget.component';
import { AnemometroWidgetComponent } from '../widgets/anemometro-widget.component';

interface WidgetOption {
  id: string;
  label: string;
  component: Type<any>;
  dados: { localizacao: string; valorPrincipal: string };
}

@Component({
  selector: 'app-widgets-host',
  templateUrl: './widgets-host.component.html',
  styleUrls: ['./widgets-host.component.css']
})
export class WidgetsHostComponent implements OnInit {
  // Contêiner de visão onde o componente dinâmico será injetado imperativamente
  @ViewChild('widgetContainer', { read: ViewContainerRef, static: true }) vcr!: ViewContainerRef;

  widgetAtivoId = 'pluvio';

  opcoes: WidgetOption[] = [
    {
      id: 'pluvio',
      label: 'Pluviômetro Digital',
      component: PluviometroWidgetComponent,
      dados: { localizacao: 'Pivô 04 - Soja Safra', valorPrincipal: '45.2 mm' }
    },
    {
      id: 'termo',
      label: 'Termohigrômetro de Dossel',
      component: TermohigrometroWidgetComponent,
      dados: { localizacao: 'Talhão 08 - Baixada', valorPrincipal: '27.9°C / 66%' }
    },
    {
      id: 'vento',
      label: 'Anemômetro de Pulverização',
      component: AnemometroWidgetComponent,
      dados: { localizacao: 'Base Operacional Sul', valorPrincipal: '11.4 km/h (Leste)' }
    }
  ];

  ngOnInit(): void {
    this.carregarWidgetPorId(this.widgetAtivoId);
  }

  selecionarWidget(id: string): void {
    this.widgetAtivoId = id;
    this.carregarWidgetPorId(id);
  }

  private carregarWidgetPorId(id: string): void {
    const opcao = this.opcoes.find(o => o.id === id);
    if (!opcao) return;

    // 1. Limpeza imperativa do contêiner anterior
    this.vcr.clear();

    // 2. Instanciação manual do componente dinâmico
    const componentRef = this.vcr.createComponent(opcao.component);

    // 3. Atribuição manual de inputs na instância
    componentRef.instance.localizacao = opcao.dados.localizacao;
    componentRef.instance.valorPrincipal = opcao.dados.valorPrincipal;

    // 4. Disparo manual de ciclo de verificação para renderização no Angular 15
    componentRef.changeDetectorRef.detectChanges();
  }
}
