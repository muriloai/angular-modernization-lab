import { Injectable } from '@angular/core';

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
  private logs: HttpLogEntry[] = [];

  getLogs(): HttpLogEntry[] {
    return this.logs;
  }

  registrarLog(entry: HttpLogEntry): void {
    // Insere o log mais recente no topo
    this.logs.unshift(entry);
    if (this.logs.length > 20) {
      this.logs.pop();
    }
  }

  limparLogs(): void {
    this.logs = [];
  }
}
