import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { InspectionReport } from '../models/inspection-report.model';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.html',
  styleUrl: './report-viewer.css'
})
export class ReportViewer {
  private readonly sanitizer = inject(DomSanitizer);

  readonly report = input.required<InspectionReport>();
  readonly allowBypass = input<boolean>(false);

  readonly trustedContent = computed<SafeHtml>(() => {
    if (this.allowBypass()) {
      return this.sanitizer.bypassSecurityTrustHtml(this.report().htmlNotes);
    }
    return '';
  });
}
