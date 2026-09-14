import { Component, computed, input } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { ExportContract } from '../models/export-contract.model';

@Component({
  selector: 'app-contract-card',
  imports: [CurrencyPipe, DatePipe, DecimalPipe],
  templateUrl: './contract-card.html',
  styleUrl: './contract-card.css'
})
export class ContractCard {
  readonly contract = input.required<ExportContract>();
  readonly showUsd = input<boolean>(false);

  readonly totalBrl = computed(() => {
    const c = this.contract();
    return c.volumeBags * c.pricePerBagBrl;
  });

  readonly totalUsd = computed(() => {
    return this.totalBrl() / this.contract().exchangeRateUsd;
  });

  readonly pricePerBagUsd = computed(() => {
    const c = this.contract();
    return c.pricePerBagBrl / c.exchangeRateUsd;
  });
}
