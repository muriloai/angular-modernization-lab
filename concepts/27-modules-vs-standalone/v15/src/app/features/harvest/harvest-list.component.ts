import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HarvestBatch } from '../../core/models/harvest.model';
import { HarvestService } from '../../core/services/harvest.service';

@Component({
  selector: 'app-harvest-list',
  templateUrl: './harvest-list.component.html',
  styleUrls: ['./harvest-list.component.css']
})
export class HarvestListComponent implements OnInit {
  batches$!: Observable<HarvestBatch[]>;

  newField: string = '';
  newCrop: 'Soja' | 'Milho' | 'Trigo' = 'Soja';
  newTonnes: number = 100;
  newDate: string = '2026-04-01';

  constructor(private harvestService: HarvestService) {}

  ngOnInit(): void {
    this.batches$ = this.harvestService.batches$;
  }

  onSubmit(): void {
    if (!this.newField) return;
    this.harvestService.addBatch({
      field: this.newField,
      crop: this.newCrop,
      tonnes: this.newTonnes,
      status: 'planejado',
      date: this.newDate
    });
    this.newField = '';
    this.newTonnes = 100;
  }

  advanceStatus(batch: HarvestBatch): void {
    if (batch.status === 'planejado') {
      this.harvestService.updateStatus(batch.id, 'em_andamento');
    } else if (batch.status === 'em_andamento') {
      this.harvestService.updateStatus(batch.id, 'concluido');
    }
  }
}
