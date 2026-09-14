import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-weather-radar',
  templateUrl: './weather-radar.html',
  styleUrls: ['./weather-radar.css']
})
export class WeatherRadar {
  radarTime = signal(new Date().toLocaleTimeString('pt-BR'));
  precipitation = signal('12mm nas próximas 3 horas');
  windSpeed = signal('18 km/h Sudoeste');
  status = signal('Chuva moderada aproximando-se do Talhão 4');

  updateRadar(): void {
    this.radarTime.set(new Date().toLocaleTimeString('pt-BR'));
  }
}
