import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TalhaoDataService } from './services/talhao-data.service';
import { Talhao } from './models/talhao.model';

@Component({
  selector: 'app-talhao-list',
  imports: [RouterLink],
  templateUrl: './talhao-list.html',
  styleUrl: './talhao-list.css'
})
export class TalhaoList {
  private readonly dataService = inject(TalhaoDataService);
  readonly talhoes = signal<Talhao[]>(this.dataService.obterTalhoes());
}
