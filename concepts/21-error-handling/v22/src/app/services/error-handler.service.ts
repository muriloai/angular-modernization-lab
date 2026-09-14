import { ErrorHandler, Injectable, signal } from '@angular/core';

export interface AgroErrorLog {
  origem: string;
  mensagem: string;
  timestamp: string;
  stack?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgroErrorHandler implements ErrorHandler {
  readonly logs = signal<AgroErrorLog[]>([]);

  handleError(error: unknown): void {
    const errObj = error as { message?: string; stack?: string };
    const msg = errObj?.message || (typeof error === 'string' ? error : 'Falha desconhecida no sistema telemétrico');

    const logItem: AgroErrorLog = {
      origem: 'Capturador Central de Falhas (ErrorHandler - Zoneless)',
      mensagem: msg,
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      stack: errObj?.stack
    };

    this.logs.update(current => [logItem, ...current.slice(0, 19)]);
    console.error('[AgroErrorHandler v22] Exceção capturada no ecossistema zoneless:', msg, error);
  }

  limparLogs(): void {
    this.logs.set([]);
  }
}
