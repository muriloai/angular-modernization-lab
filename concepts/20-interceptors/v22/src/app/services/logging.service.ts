import { Injectable, signal } from '@angular/core';

export interface HttpLogEntry {
  metodo: string;
  url: string;
  status: number;
  duracaoMs: number;
  timestamp: string;
  headersEnviados: Record<string, string>;
}

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  // Histórico de logs alimentado reativamente por Signal
  readonly logs = signal<HttpLogEntry[]>([]);

  registrarLog(entry: HttpLogEntry): void {
    this.logs.update(lista => [entry, ...lista].slice(0, 20));
  }

  limparLogs(): void {
    this.logs.set([]);
  }
}
