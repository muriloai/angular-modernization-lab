import { Component, signal } from '@angular/core';
import { ExportContract } from './models/export-contract.model';
import { ContractCard } from './components/contract-card';

@Component({
  selector: 'app-root',
  imports: [ContractCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly title = signal('Fazenda Santa Maria - Contratos de Exportação (v22)');
  readonly showUsd = signal(false);

  readonly contracts = signal<ExportContract[]>([
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
  ]);

  toggleCurrency(): void {
    this.showUsd.update(v => !v);
  }
}
