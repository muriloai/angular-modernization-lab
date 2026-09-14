export interface IrrigationPivot {
  id: string;
  name: string;
  field: string;
  pressureBar: number;
  flowRateM3h: number;
  isActive: boolean;
  angleDegrees: number;
}
