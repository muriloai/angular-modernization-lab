export type SensorStatus = 'normal' | 'alerta' | 'critico';

export interface Sensor {
  id: string;
  tipo: string;
  talhao: string;
  valor: number;
  unidade: string;
  status: SensorStatus;
  bateria: number;
}
