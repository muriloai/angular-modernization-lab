import { Component, signal } from '@angular/core';

interface CropAlert {
  id: string;
  cultura: string;
  tipo: string;
  severidade: 'Alta' | 'Média' | 'Baixa';
  talhao: string;
  recomendacao: string;
}

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.html',
  styleUrls: ['./alerts.css']
})
export class Alerts {
  readonly alertas = signal<CropAlert[]>([
    {
      id: 'ALT-801',
      cultura: 'Soja',
      tipo: 'Lagarta-do-Cartucho (Spodoptera frugiperda)',
      severidade: 'Alta',
      talhao: 'Talhão 02 - Pivô Central',
      recomendacao: 'Programar pulverização direcionada nas próximas 24 horas.'
    },
    {
      id: 'ALT-802',
      cultura: 'Milho',
      tipo: 'Estresse Hídrico Inicial',
      severidade: 'Média',
      talhao: 'Talhão 05 - Sequeiro',
      recomendacao: 'Aumentar ciclo de irrigação no setor leste.'
    },
    {
      id: 'ALT-803',
      cultura: 'Algodão',
      tipo: 'Alerta Fitossanitário: Bicudo-do-algodoeiro',
      severidade: 'Baixa',
      talhao: 'Talhão 09 - Borda Norte',
      recomendacao: 'Monitoramento semanal por armadilhas de feromônio.'
    }
  ]);
}
