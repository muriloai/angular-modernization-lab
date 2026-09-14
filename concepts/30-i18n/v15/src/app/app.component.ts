import { Component } from '@angular/core';
import { ExportContract } from './models/export-contract.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fazenda Santa Maria - Contratos de Exportação (v15)';
  showUsd = false;

  contracts: ExportContract[] = [
    {
      id: 'CTR-2026-08',
      client: 'Cofco International',
      country: 'China',
      crop: 'Soja',
      volumeBags: 25000,
      pricePerBagBrl: 138.50,
      exchangeRateUsd: 5.65,
      shipmentDate: '2026-05-15'
    },
    {
      id: 'CTR-2026-09',
      client: 'Bunge Global Agri',
      country: 'Holanda',
      crop: 'Milho',
      volumeBags: 18000,
      pricePerBagBrl: 64.20,
      exchangeRateUsd: 5.65,
      shipmentDate: '2026-06-20'
    },
    {
      id: 'CTR-2026-10',
      client: 'Louis Dreyfus Company',
      country: 'Japão',
      crop: 'Algodao',
      volumeBags: 12000,
      pricePerBagBrl: 215.00,
      exchangeRateUsd: 5.65,
      shipmentDate: '2026-07-10'
    }
  ];

  toggleCurrency(): void {
    this.showUsd = !this.showUsd;
  }
}
