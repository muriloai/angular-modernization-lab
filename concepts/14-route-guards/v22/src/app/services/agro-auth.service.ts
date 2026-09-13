import { Injectable, signal } from '@angular/core';

export interface AgroUser {
  nome: string;
  cargo: string;
  registro: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgroAuthService {
  // Primitivas reativas de Signal no Angular 22
  readonly isAuthenticated = signal<boolean>(false);
  readonly currentUser = signal<AgroUser | null>(null);

  login(nome: string, cargo: string, registro: string): void {
    this.isAuthenticated.set(true);
    this.currentUser.set({ nome, cargo, registro });
  }

  logout(): void {
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
  }
}
