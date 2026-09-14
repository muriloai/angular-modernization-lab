import { Component, ElementRef, Renderer2, effect, inject, input, viewChild, DecimalPipe } from '@angular/core';
import { SiloData } from '../models/silo.model';

@Component({
  selector: 'app-silo-visualizer',
  imports: [DecimalPipe],
  templateUrl: './silo-visualizer.html',
  styleUrl: './silo-visualizer.css'
})
export class SiloVisualizer {
  private readonly renderer = inject(Renderer2);

  readonly silo = input.required<SiloData>();

  readonly gaugeFill = viewChild<ElementRef>('gaugeFill');
  readonly statusTag = viewChild<ElementRef>('statusTag');
  readonly tempValue = viewChild<ElementRef>('tempValue');

  constructor() {
    // Sincronizacao automatica e segura via effect e Renderer2
    effect(() => {
      const data = this.silo();
      const fillEl = this.gaugeFill()?.nativeElement;
      const tagEl = this.statusTag()?.nativeElement;
      const tempEl = this.tempValue()?.nativeElement;

      if (!fillEl || !tagEl || !tempEl) return;

      const fillPercent = Math.round((data.currentTonnes / data.capacityTonnes) * 100);

      // Manipulacao de estilo com Renderer2
      this.renderer.setStyle(fillEl, 'height', `${fillPercent}%`);

      if (fillPercent > 90) {
        this.renderer.setStyle(fillEl, 'background-color', '#ef4444');
      } else if (fillPercent > 70) {
        this.renderer.setStyle(fillEl, 'background-color', '#f59e0b');
      } else {
        this.renderer.setStyle(fillEl, 'background-color', '#10b981');
      }

      // Manipulacao de classes CSS
      if (data.temperatureC > 30) {
        this.renderer.addClass(tagEl, 'tag-alert');
        this.renderer.removeClass(tagEl, 'tag-normal');
        this.renderer.setProperty(tagEl, 'innerText', 'Temperatura Elevada');
      } else {
        this.renderer.addClass(tagEl, 'tag-normal');
        this.renderer.removeClass(tagEl, 'tag-alert');
        this.renderer.setProperty(tagEl, 'innerText', 'Clima Ideal');
      }

      // Atualizacao de texto
      this.renderer.setProperty(tempEl, 'innerText', `${data.temperatureC} °C`);
    });
  }
}
