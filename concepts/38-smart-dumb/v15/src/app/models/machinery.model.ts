export type MachineryType = 'Trator' | 'Colheitadeira' | 'Pulverizador';
export type MachineryStatus = 'Em Operação' | 'Em Manutenção' | 'Aguardando Despacho';

export interface Machinery {
  id: string;
  code: string;
  name: string;
  type: MachineryType;
  fuelLevel: number; // 0-100%
  engineHours: number;
  oilPressureBar: number;
  isAutonomous: boolean;
  status: MachineryStatus;
}

export interface MachineryActionEvent {
  machineryId: string;
  action: 'toggle-autonomous' | 'request-maintenance' | 'dispatch';
}
