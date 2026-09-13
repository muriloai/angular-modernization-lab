export type SensorStatus = 'normal' | 'alerta' | 'critico';

export interface SensorItem {
  id: string;
  tipo: string;
  talhao: string;
  leitura: number;
  unidade: string;
  status: SensorStatus;
  dataLeitura: Date;
  custoManutencao: number;
}
