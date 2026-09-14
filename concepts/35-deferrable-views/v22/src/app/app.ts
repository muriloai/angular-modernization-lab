import { Component, signal } from '@angular/core';
import { WeatherRadar } from './components/weather-radar';
import { SoilAnalysis } from './components/soil-analysis';

@Component({
  selector: 'app-root',
  imports: [WeatherRadar, SoilAnalysis],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = signal('Fazenda Santa Maria - Painel Agroclimático (v22)');
}
