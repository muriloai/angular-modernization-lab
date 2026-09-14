export interface CropAlert {
  id: string;
  field: string;
  type: 'geada' | 'seca' | 'praga' | 'colheita';
  severity: 'alta' | 'media' | 'baixa';
  message: string;
  timestamp: string;
}
