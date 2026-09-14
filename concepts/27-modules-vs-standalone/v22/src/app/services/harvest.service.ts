import { Injectable, signal } from '@angular/core';
import { HarvestBatch } from '../models/harvest.model';

@Injectable({
  providedIn: 'root'
})
export class HarvestService {
  private readonly initialBatches: HarvestBatch[] = [
    { id: 'COL-001', field: 'Talhao Norte 04', crop: 'Soja', tonnes: 320, status: 'concluido', date: '2026-03-01' },
    { id: 'COL-002', field: 'Talhao Sul 12', crop: 'Milho', tonnes: 480, status: 'em_andamento', date: '2026-03-05' },
    { id: 'COL-003', field: 'Pivo Central 02', crop: 'Trigo', tonnes: 190, status: 'planejado', date: '2026-03-15' }
  ];

  readonly batches = signal<HarvestBatch[]>(this.initialBatches);

  addBatch(batch: Omit<HarvestBatch, 'id'>): void {
    const current = this.batches();
    const newBatch: HarvestBatch = {
      ...batch,
      id: `COL-${String(current.length + 1).padStart(3, '0')}`
    };
    this.batches.update(list => [...list, newBatch]);
  }

  updateStatus(id: string, status: HarvestBatch['status']): void {
    this.batches.update(list =>
      list.map(item => (item.id === id ? { ...item, status } : item))
    );
  }
}
