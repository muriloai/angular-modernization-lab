export interface AgroSensor {
  id: string;
  nome: string;
  talhao: string;
  tipo: 'Umidade do Solo' | 'Temperatura' | 'Tensão Hídrica';
  valor: string;
  ativo: boolean;
}
