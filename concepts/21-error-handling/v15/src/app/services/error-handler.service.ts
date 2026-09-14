import { ErrorHandler, Injectable } from '@angular/core';

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
  private logs: AgroErrorLog[] = [];

  handleError(error: any): void {
    const msg = error?.message || (typeof error === 'string' ? error : 'Erro desconhecido');
    const logItem: AgroErrorLog = {
      origem: 'Capturador Central de Falhas (ErrorHandler)',
      mensagem: msg,
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      stack: error?.stack
    };

    this.logs.unshift(logItem);
    if (this.logs.length > 20) {
      this.logs.pop();
    }

    console.error('[AgroErrorHandler] Exceção telemétrica capturada:', msg, error);
  }

  getLogs(): AgroErrorLog[] {
    return this.logs;
  }

  limparLogs(): void {
    this.logs = [];
  }
}
