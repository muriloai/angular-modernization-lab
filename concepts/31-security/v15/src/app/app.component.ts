import { Component } from '@angular/core';
import { InspectionReport } from './models/inspection-report.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fazenda Santa Maria - Segurança e Laudos Técnicos (v15)';
  allowAuditBypass = false;

  reports: InspectionReport[] = [
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
  ];

  customHtml = '<p>Nota técnica customizada: <strong>Solo equilibrado</strong>. <a href="javascript:alert(1)">Clique aqui</a> para detalhes.</p>';

  toggleBypass(): void {
    this.allowAuditBypass = !this.allowAuditBypass;
  }
}
