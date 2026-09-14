import { Component } from '@angular/core';

@Component({
  selector: 'app-weather-radar',
  templateUrl: './weather-radar.component.html',
  styleUrls: ['./weather-radar.component.css']
})
export class WeatherRadarComponent {
  station = 'Radar Meteorológico Doppler - Fazenda Santa Maria';
  precipitationProb = 85;
  windSpeedKmh = 28;
  temperatureC = 26.4;
  cloudCover = 'Encoberto com formação de cúmulos';
}
