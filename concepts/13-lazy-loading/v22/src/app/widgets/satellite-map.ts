import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-satellite-map',
  templateUrl: './satellite-map.html',
  styleUrl: './satellite-map.css'
})
export class SatelliteMap {
  readonly indicesNDVI = signal([
    { talhao: 'Talhão Norte 01', ndvi: 0.82, vigor: 'Excelente (Vegetação Densa)', cor: '#15803d' },
    { talhao: 'Talhão Sul 02', ndvi: 0.68, vigor: 'Bom (Desenvolvimento Normal)', cor: '#65a30d' },
    { talhao: 'Talhão Leste 03', ndvi: 0.51, vigor: 'Moderado (Atenção Hídrica)', cor: '#eab308' },
    { talhao: 'Talhão Oeste 04', ndvi: 0.79, vigor: 'Ótimo (Cultura Estabelecida)', cor: '#16a34a' }
  ]);
}
