import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { InspectionReport } from '../models/inspection-report.model';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css']
})
export class ReportViewerComponent implements OnChanges {
  @Input() report!: InspectionReport;
  @Input() allowBypass: boolean = false;

  trustedContent: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    if (this.allowBypass && this.report) {
      // Uso controlado do bypassSecurityTrustHtml
      this.trustedContent = this.sanitizer.bypassSecurityTrustHtml(this.report.htmlNotes);
    } else {
      this.trustedContent = '';
    }
  }
}
