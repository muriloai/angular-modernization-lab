import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HarvestService } from '../../services/harvest.service';
import { HarvestBatch } from '../../models/harvest.model';
import { StatusBadge } from '../../components/status-badge';

@Component({
  selector: 'app-harvest-list',
  imports: [FormsModule, StatusBadge],
  templateUrl: './harvest-list.html',
  styleUrl: './harvest-list.css'
})
export class HarvestList {
  private readonly harvestService = inject(HarvestService);

  readonly batches = this.harvestService.batches;

  newField = signal<string>('');
  newCrop = signal<'Soja' | 'Milho' | 'Trigo'>('Soja');
  newTonnes = signal<number>(100);
  newDate = signal<string>('2026-04-01');

  onSubmit(): void {
    const field = this.newField().trim();
    if (!field) return;

    this.harvestService.addBatch({
      field,
      crop: this.newCrop(),
      tonnes: this.newTonnes(),
      status: 'planejado',
      date: this.newDate()
    });

    this.newField.set('');
    this.newTonnes.set(100);
  }

  advanceStatus(batch: HarvestBatch): void {
    if (batch.status === 'planejado') {
      this.harvestService.updateStatus(batch.id, 'em_andamento');
    } else if (batch.status === 'em_andamento') {
      this.harvestService.updateStatus(batch.id, 'concluido');
    }
  }
}
