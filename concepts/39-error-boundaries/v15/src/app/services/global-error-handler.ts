import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  lastErrorMessage: string | null = null;
  errorCount = 0;

  handleError(error: any): void {
    this.errorCount++;
    this.lastErrorMessage = error?.message || String(error);
    console.warn('[GlobalErrorHandler v15] Exceção capturada globalmente:', error);
  }
}
