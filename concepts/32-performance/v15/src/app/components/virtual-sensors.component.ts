import { Component, OnInit } from '@angular/core';
import { SensorData } from '../models/sensor.model';

@Component({
  selector: 'app-virtual-sensors',
  templateUrl: './virtual-sensors.component.html',
  styleUrls: ['./virtual-sensors.component.css']
})
export class VirtualSensorsComponent implements OnInit {
  allSensors: SensorData[] = [];
  filteredSensors: SensorData[] = [];
  filterQuery: string = '';
  selectedMetric: string = 'TODAS';

  ngOnInit(): void {
    this.allSensors = this.generateTenThousandSensors();
    this.applyFilter();
  }

  applyFilter(): void {
    const query = this.filterQuery.toLowerCase();
    this.filteredSensors = this.allSensors.filter(sensor => {
      const matchQuery = sensor.name.toLowerCase().includes(query) || sensor.field.toLowerCase().includes(query);
      const matchMetric = this.selectedMetric === 'TODAS' || sensor.metricType === this.selectedMetric;
      return matchQuery && matchMetric;
    });
  }

  private generateTenThousandSensors(): SensorData[] {
    const list: SensorData[] = [];
    const metrics: ('Umidade' | 'Temperatura' | 'PH' | 'Radiacao')[] = ['Umidade', 'Temperatura', 'PH', 'Radiacao'];
    const fields = ['Talhão Norte 01', 'Talhão Sul 04', 'Talhão Leste 09', 'Pivô Central 03', 'Silo Principal', 'Área de Reserva'];

    for (let i = 1; i <= 10000; i++) {
      const metric = metrics[i % metrics.length];
      let value = 0;
      let unit = '';
      if (metric === 'Umidade') { value = 18 + (i % 35); unit = '%'; }
      else if (metric === 'Temperatura') { value = 20 + (i % 18); unit = '°C'; }
      else if (metric === 'PH') { value = 5.5 + ((i % 20) / 10); unit = 'pH'; }
      else { value = 400 + (i % 600); unit = 'W/m²'; }

      const status: 'operacional' | 'atencao' | 'falha' = 
        i % 47 === 0 ? 'falha' : (i % 13 === 0 ? 'atencao' : 'operacional');

      list.push({
        id: `SNS-${String(i).padStart(5, '0')}`,
        name: `Sensor IoT #${i}`,
        field: fields[i % fields.length],
        metricType: metric,
        value: Number(value.toFixed(1)),
        unit,
        batteryPercent: 100 - (i % 70),
        status
      });
    }
    return list;
  }
}
