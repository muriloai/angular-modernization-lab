import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Machinery, MachineryActionEvent } from './models/machinery.model';
import { MachineryService } from './services/machinery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fazenda Santa Maria - Gestão da Frota de Maquinários (v15 - Smart/Dumb Clássico)';

  fleet$: Observable<Machinery[]> = this.machineryService.fleet$;

  constructor(private machineryService: MachineryService) {}

  onMachineryAction(event: MachineryActionEvent): void {
    this.machineryService.handleAction(event);
  }
}
