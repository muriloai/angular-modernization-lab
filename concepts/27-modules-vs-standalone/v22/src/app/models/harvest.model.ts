export interface HarvestBatch {
  id: string;
  field: string;
  crop: 'Soja' | 'Milho' | 'Trigo';
  tonnes: number;
  status: 'planejado' | 'em_andamento' | 'concluido';
  date: string;
}
