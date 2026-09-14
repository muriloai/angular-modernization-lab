import { Component, signal } from '@angular/core';
import { InspectionReport } from './models/inspection-report.model';
import { ReportViewer } from './components/report-viewer';

@Component({
  selector: 'app-root',
  imports: [ReportViewer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly title = signal('Fazenda Santa Maria - Segurança e Laudos Técnicos (v22)');
  readonly allowAuditBypass = signal(false);

  readonly reports = signal<InspectionReport[]>([
    {
      id: 'REP-01',
      field: 'Talhão Soja Oeste 07',
      inspector: 'Eng. Agr. Carlos Lima',
      date: '2026-03-10',
      htmlNotes: 'Área com <em>infestação moderada</em> de ferrugem asiática. Recomendada pulverização preventiva.<script>alert("Tentativa de XSS bloqueada pelo Angular!");</script>',
      hasAuditApproval: true
    },
    {
      id: 'REP-02',
      field: 'Talhão Milho Safrinha 03',
      inspector: 'Téc. Agr. Julia Ribeiro',
      date: '2026-03-12',
      htmlNotes: 'Desenvolvimento foliar com coloração <span style="color: green; font-weight: bold;">vigorosa</span>. Umidade do solo em 24%. <img src="invalid-image" onerror="console.warn(\'Script onerror bloqueado!\')" />',
      hasAuditApproval: false
    }
  ]);

  toggleBypass(): void {
    this.allowAuditBypass.update(v => !v);
  }
}
