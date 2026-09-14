import { Injectable } from '@angular/core';
import { GrainBatch } from '../models/grain-batch';

@Injectable({
  providedIn: 'root'
})
export class SiloApi {
  private batchesDatabase: Record<string, GrainBatch[]> = {
    soja: [
      { id: 'LT-SJ-2026-01', crop: 'Soja Convencional', silo: 'Silo Alfa (Cap. 5000t)', tonnage: 1420, moisturePercentage: 12.8, temperatureCelsius: 19.5, qualityClass: 'Exportação', harvestDate: '2026-03-01' },
      { id: 'LT-SJ-2026-02', crop: 'Soja Convencional', silo: 'Silo Beta (Cap. 3500t)', tonnage: 980, moisturePercentage: 13.2, temperatureCelsius: 20.1, qualityClass: 'Tipo 1', harvestDate: '2026-03-04' }
    ],
    milho: [
      { id: 'LT-ML-2026-01', crop: 'Milho Safrinha', silo: 'Silo Gama (Cap. 6000t)', tonnage: 3100, moisturePercentage: 14.1, temperatureCelsius: 21.0, qualityClass: 'Tipo 1', harvestDate: '2026-02-20' },
      { id: 'LT-ML-2026-02', crop: 'Milho Safrinha', silo: 'Silo Delta (Cap. 4000t)', tonnage: 1850, moisturePercentage: 13.9, temperatureCelsius: 20.4, qualityClass: 'Exportação', harvestDate: '2026-02-25' }
    ],
    algodao: [
      { id: 'LT-AL-2026-01', crop: 'Algodão Pluma', silo: 'Armazém Arejado 01', tonnage: 620, moisturePercentage: 8.5, temperatureCelsius: 22.0, qualityClass: 'Exportação', harvestDate: '2026-02-15' }
    ]
  };

  async fetchBatches(cropKey: string, simulateError: boolean, abortSignal?: AbortSignal): Promise<GrainBatch[]> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        if (simulateError) {
          reject(new Error('Falha na comunicação com telemetria dos silos'));
        } else {
          resolve(this.batchesDatabase[cropKey] || []);
        }
      }, 600);

      if (abortSignal) {
        abortSignal.addEventListener('abort', () => {
          clearTimeout(timer);
          reject(new DOMException('Requisição cancelada pelo cliente', 'AbortError'));
        });
      }
    });
  }
}
