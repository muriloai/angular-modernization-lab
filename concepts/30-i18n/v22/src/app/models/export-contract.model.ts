export interface ExportContract {
  id: string;
  client: string;
  country: string;
  crop: 'Soja' | 'Milho' | 'Algodao';
  volumeBags: number;
  pricePerBagBrl: number;
  exchangeRateUsd: number;
  shipmentDate: string;
}
