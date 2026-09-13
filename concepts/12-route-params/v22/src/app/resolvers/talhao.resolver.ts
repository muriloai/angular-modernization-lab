import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Talhao } from '../models/talhao.model';
import { TalhaoDataService } from '../services/talhao-data.service';

/**
 * Resolver funcional moderno do Angular 22 tipado com ResolveFn.
 * Dispensa a necessidade de classes e implementações de interfaces legadas.
 */
export const talhaoResolver: ResolveFn<Talhao | undefined> = route => {
  const dataService = inject(TalhaoDataService);
  const id = route.paramMap.get('id') ?? '';
  return dataService.obterPorId(id);
};
