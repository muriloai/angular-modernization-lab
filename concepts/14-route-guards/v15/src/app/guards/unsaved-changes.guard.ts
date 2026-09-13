import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface HasPendingChanges {
  hasUnsavedChanges(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<HasPendingChanges> {
  canDeactivate(component: HasPendingChanges): boolean {
    if (component.hasUnsavedChanges && component.hasUnsavedChanges()) {
      return confirm(
        'Atenção: Existem alterações não salvas no registro de manutenção do maquinário. Deseja realmente sair e descartar as informações?'
      );
    }
    return true;
  }
}
