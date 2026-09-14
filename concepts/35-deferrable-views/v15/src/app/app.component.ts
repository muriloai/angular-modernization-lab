import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fazenda Santa Maria - Painel Agroclimático (v15)';

  @ViewChild('radarAnchor', { read: ViewContainerRef }) radarAnchor!: ViewContainerRef;
  @ViewChild('soilAnchor', { read: ViewContainerRef }) soilAnchor!: ViewContainerRef;

  isRadarLoading = false;
  isRadarLoaded = false;

  isSoilLoading = false;
  isSoilLoaded = false;

  async loadRadarManually(): Promise<void> {
    if (this.isRadarLoaded || this.isRadarLoading) return;
    this.isRadarLoading = true;

    // Simula atraso de download de chunk
    await new Promise(r => setTimeout(r, 600));

    const { WeatherRadarComponent } = await import('./components/weather-radar.component');
    this.radarAnchor.createComponent(WeatherRadarComponent);

    this.isRadarLoading = false;
    this.isRadarLoaded = true;
  }

  async loadSoilManually(): Promise<void> {
    if (this.isSoilLoaded || this.isSoilLoading) return;
    this.isSoilLoading = true;

    await new Promise(r => setTimeout(r, 600));

    const { SoilAnalysisComponent } = await import('./components/soil-analysis.component');
    this.soilAnchor.createComponent(SoilAnalysisComponent);

    this.isSoilLoading = false;
    this.isSoilLoaded = true;
  }
}
