import { CanDeactivateFn } from '@angular/router';

export interface HasPendingChanges {
  hasUnsavedChanges: () => boolean;
}

/**
 * Guarda de desativação funcional do Angular 22:
 * Recebe a instância do componente alvo diretamente como parâmetro.
 * Intercepta navegações pendentes de forma simples e tipada.
 */
export const unsavedChangesGuard: CanDeactivateFn<HasPendingChanges> = (component: HasPendingChanges) => {
  if (component.hasUnsavedChanges()) {
    return confirm(
      'Atenção: Existem alterações não salvas no registro de manutenção do maquinário. Deseja realmente sair e descartar as informações?'
    );
  }
  return true;
};
