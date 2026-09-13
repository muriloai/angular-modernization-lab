import { Injectable } from '@angular/core';

export interface AgroUser {
  nome: string;
  cargo: string;
  registro: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgroAuthService {
  private authenticated = false;
  private currentUser: AgroUser | null = null;

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getCurrentUser(): AgroUser | null {
    return this.currentUser;
  }

  login(nome: string, cargo: string, registro: string): void {
    this.authenticated = true;
    this.currentUser = { nome, cargo, registro };
  }

  logout(): void {
    this.authenticated = false;
    this.currentUser = null;
  }
}
