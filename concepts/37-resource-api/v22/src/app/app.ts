import { Component, signal, resource, inject } from '@angular/core';
import { SiloApi } from './services/silo-api';
import { GrainBatch } from './models/grain-batch';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  private siloApi = inject(SiloApi);

  title = signal('Fazenda Santa Maria - Rastreabilidade de Grãos (v22 - Resource API)');
  selectedCrop = signal('soja');
  simulateError = signal(false);

  // Primitiva declarativa resource() nativa do Angular orientada a Signals
  batchesResource = resource<GrainBatch[], { crop: string; simulateError: boolean }>({
    request: () => ({
      crop: this.selectedCrop(),
      simulateError: this.simulateError()
    }),
    loader: async ({ request, abortSignal }) => {
      return await this.siloApi.fetchBatches(request.crop, request.simulateError, abortSignal);
    }
  });

  onCropChange(crop: string): void {
    this.selectedCrop.set(crop);
  }

  toggleSimulateError(): void {
    this.simulateError.update(v => !v);
  }

  reload(): void {
    this.batchesResource.reload();
  }
}
