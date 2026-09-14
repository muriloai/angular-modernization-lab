export interface SupplyItem {
  id: string;
  name: string;
  category: 'Fertilizante' | 'Defensivo' | 'Semente';
  stockQuantity: number;
  unit: string;
  location: string;
}
