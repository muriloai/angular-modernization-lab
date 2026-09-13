import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Talhao } from '../models/talhao.model';
import { TalhaoDataService } from '../services/talhao-data.service';

@Injectable({ providedIn: 'root' })
export class TalhaoResolver implements Resolve<Talhao | undefined> {
  constructor(private dataService: TalhaoDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Talhao | undefined> {
    const id = route.paramMap.get('id') ?? '';
    return of(this.dataService.obterPorId(id));
  }
}
