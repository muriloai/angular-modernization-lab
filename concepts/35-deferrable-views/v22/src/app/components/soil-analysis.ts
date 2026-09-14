import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-soil-analysis',
  templateUrl: './soil-analysis.html',
  styleUrls: ['./soil-analysis.css']
})
export class SoilAnalysis {
  nitrogen = signal(140);
  phosphorus = signal(42);
  potassium = signal(210);
  ph = signal(6.4);
  qualityGrade = signal('Excelente');

  recalibrateSensors(): void {
    this.nitrogen.update(n => n + 5);
    this.ph.set(6.5);
  }
}
