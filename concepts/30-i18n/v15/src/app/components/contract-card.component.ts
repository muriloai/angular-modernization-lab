import { Component, Input } from '@angular/core';
import { ExportContract } from '../models/export-contract.model';

@Component({
  selector: 'app-contract-card',
  templateUrl: './contract-card.component.html',
  styleUrls: ['./contract-card.component.css']
})
export class ContractCardComponent {
  @Input() contract!: ExportContract;
  @Input() showUsd: boolean = false;

  get totalBrl(): number {
    return this.contract.volumeBags * this.contract.pricePerBagBrl;
  }

  get totalUsd(): number {
    return this.totalBrl / this.contract.exchangeRateUsd;
  }

  get pricePerBagUsd(): number {
    return this.contract.pricePerBagBrl / this.contract.exchangeRateUsd;
  }
}
