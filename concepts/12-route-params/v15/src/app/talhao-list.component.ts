import { Component } from '@angular/core';
import { TalhaoDataService } from './services/talhao-data.service';
import { Talhao } from './models/talhao.model';

@Component({
  selector: 'app-talhao-list',
  templateUrl: './talhao-list.component.html',
  styleUrls: ['./talhao-list.component.css']
})
export class TalhaoListComponent {
  readonly talhoes: Talhao[];

  constructor(private dataService: TalhaoDataService) {
    this.talhoes = this.dataService.obterTalhoes();
  }
}
