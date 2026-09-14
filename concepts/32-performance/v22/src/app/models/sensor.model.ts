export interface SensorData {
  id: string;
  name: string;
  field: string;
  metricType: 'Umidade' | 'Temperatura' | 'PH' | 'Radiacao';
  value: number;
  unit: string;
  batteryPercent: number;
  status: 'operacional' | 'atencao' | 'falha';
}
