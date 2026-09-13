export interface Talhao {
  id: string;
  nome: string;
  cultura: string;
  areaHectares: number;
  tipoSolo: string;
  umidadeMedia: number;
  statusIrrigacao: 'ativa' | 'desligada' | 'programada';
  historicoIntervencao: string;
}
