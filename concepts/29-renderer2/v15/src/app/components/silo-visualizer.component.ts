import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';
import { SiloData } from '../models/silo.model';

@Component({
  selector: 'app-silo-visualizer',
  templateUrl: './silo-visualizer.component.html',
  styleUrls: ['./silo-visualizer.component.css']
})
export class SiloVisualizerComponent implements AfterViewInit, OnChanges {
  @Input() silo!: SiloData;

  @ViewChild('gaugeFill') gaugeFill!: ElementRef;
  @ViewChild('statusTag') statusTag!: ElementRef;
  @ViewChild('tempValue') tempValue!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.applyVisualStyles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['silo'] && this.gaugeFill) {
      this.applyVisualStyles();
    }
  }

  private applyVisualStyles(): void {
    if (!this.gaugeFill || !this.statusTag || !this.tempValue) return;

    const fillPercent = Math.round((this.silo.currentTonnes / this.silo.capacityTonnes) * 100);

    // Manipulacao segura da altura da barra via Renderer2
    this.renderer.setStyle(this.gaugeFill.nativeElement, 'height', `${fillPercent}%`);

    // Manipulacao dinamica de cor de preenchimento
    if (fillPercent > 90) {
      this.renderer.setStyle(this.gaugeFill.nativeElement, 'background-color', '#ef4444');
    } else if (fillPercent > 70) {
      this.renderer.setStyle(this.gaugeFill.nativeElement, 'background-color', '#f59e0b');
    } else {
      this.renderer.setStyle(this.gaugeFill.nativeElement, 'background-color', '#10b981');
    }

    // Manipulacao segura de classes CSS com addClass / removeClass
    if (this.silo.temperatureC > 30) {
      this.renderer.addClass(this.statusTag.nativeElement, 'tag-alert');
      this.renderer.removeClass(this.statusTag.nativeElement, 'tag-normal');
      this.renderer.setProperty(this.statusTag.nativeElement, 'innerText', 'Temperatura Elevada');
    } else {
      this.renderer.addClass(this.statusTag.nativeElement, 'tag-normal');
      this.renderer.removeClass(this.statusTag.nativeElement, 'tag-alert');
      this.renderer.setProperty(this.statusTag.nativeElement, 'innerText', 'Clima Ideal');
    }

    // Manipulacao de texto
    this.renderer.setProperty(this.tempValue.nativeElement, 'innerText', `${this.silo.temperatureC} °C`);
  }
}
