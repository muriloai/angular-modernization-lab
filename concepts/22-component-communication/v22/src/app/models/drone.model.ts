export interface Drone {
  id: string;
  modelo: string;
  finalidade: string;
  bateriaPercentual: number;
  capacidadeTanqueLitros: number;
  status: 'Em Espera' | 'Em Pulverização' | 'Mapeando' | 'Retornando à Base';
  talhaoDesignado: string;
}
