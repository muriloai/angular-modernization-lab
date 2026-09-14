import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SupplyItem } from '../models/supply.model';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {
  private readonly mockSupplies: SupplyItem[] = [
    { id: 'INS-01', name: 'Semente Soja Intacta Pro', category: 'Semente', stockQuantity: 450, unit: 'sacas', location: 'Galpão A - Palete 04' },
    { id: 'INS-02', name: 'Semente Milho Híbrido VT', category: 'Semente', stockQuantity: 280, unit: 'sacas', location: 'Galpão A - Palete 08' },
    { id: 'INS-03', name: 'Fertilizante NPK 04-14-08', category: 'Fertilizante', stockQuantity: 12000, unit: 'kg', location: 'Silo de Granel 02' },
    { id: 'INS-04', name: 'Cloreto de Potássio Branco', category: 'Fertilizante', stockQuantity: 8500, unit: 'kg', location: 'Silo de Granel 01' },
    { id: 'INS-05', name: 'Fungicida Azoxistrobina', category: 'Defensivo', stockQuantity: 340, unit: 'litros', location: 'Depósito Químico B' },
    { id: 'INS-06', name: 'Herbicida Glifosato 480', category: 'Defensivo', stockQuantity: 520, unit: 'litros', location: 'Depósito Químico B' },
    { id: 'INS-07', name: 'Inseticida Cipermetrina', category: 'Defensivo', stockQuantity: 150, unit: 'litros', location: 'Depósito Químico A' }
  ];

  searchSupplies(term: string): Observable<SupplyItem[]> {
    const q = term.trim().toLowerCase();
    const filtered = q
      ? this.mockSupplies.filter(item => 
          item.name.toLowerCase().includes(q) || 
          item.category.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
        )
      : this.mockSupplies;

    return of(filtered).pipe(delay(250));
  }

  dispatchApplication(supplyId: string): Observable<{ success: boolean; message: string }> {
    const item = this.mockSupplies.find(s => s.id === supplyId);
    const msg = item
      ? `Ordem de liberação processada com sucesso para ${item.name}.`
      : 'Insumo não localizado.';

    return of({ success: true, message: msg }).pipe(delay(900));
  }
}
