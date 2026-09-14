import { Component } from '@angular/core';

@Component({
  selector: 'app-soil-analysis',
  templateUrl: './soil-analysis.component.html',
  styleUrls: ['./soil-analysis.component.css']
})
export class SoilAnalysisComponent {
  zoneName = 'Talhão Sul 02 - Análise de Condutividade Eletrolítica';
  phLevel = 6.4;
  organicMatterPercent = 3.8;
  potassiumMgDm3 = 142;
  phosphorusMgDm3 = 24.5;
}
