import { Component, signal, viewChild } from '@angular/core';
import { ErrorBoundary } from './components/error-boundary';
import { WeatherWidget } from './components/weather-widget';
import { DroneWidget } from './components/drone-widget';
import { MultispectralWidget } from './components/multispectral-widget';

@Component({
  selector: 'app-root',
  imports: [ErrorBoundary, WeatherWidget, DroneWidget, MultispectralWidget],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = signal('Fazenda Santa Maria - Painel Agroclima (v22 - Error Boundaries)');

  // Referência tipada reativa para a fronteira do sensor multiespectral
  readonly multispectralBoundary = viewChild<ErrorBoundary>('multiBoundary');

  onMultispectralError(reason: string): void {
    const boundary = this.multispectralBoundary();
    if (boundary) {
      boundary.triggerError(reason);
    }
  }
}
