export interface SiloData {
  id: string;
  name: string;
  grain: 'Soja' | 'Milho';
  capacityTonnes: number;
  currentTonnes: number;
  temperatureC: number;
}
