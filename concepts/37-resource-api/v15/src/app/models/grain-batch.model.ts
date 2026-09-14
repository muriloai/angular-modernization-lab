export interface GrainBatch {
  id: string;
  crop: string;
  silo: string;
  tonnage: number;
  moisturePercentage: number;
  temperatureCelsius: number;
  qualityClass: 'Tipo 1' | 'Tipo 2' | 'Exportação';
  harvestDate: string;
}
