export interface Machine {
  id: string;
  nome: string;
  tipo: string;
  operador: string;
  status: 'Em Operação' | 'Standby' | 'Manutenção';
  horasTrabalhadas: number;
}
