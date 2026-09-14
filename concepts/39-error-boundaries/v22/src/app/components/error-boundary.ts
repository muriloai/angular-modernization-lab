import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-error-boundary',
  templateUrl: './error-boundary.html',
  styleUrls: ['./error-boundary.css']
})
export class ErrorBoundary {
  readonly moduleName = input<string>('Widget');

  readonly hasError = signal(false);
  readonly errorMessage = signal<string | null>(null);

  triggerError(reason: string): void {
    this.hasError.set(true);
    this.errorMessage.set(reason);
  }

  retry(): void {
    this.hasError.set(false);
    this.errorMessage.set(null);
  }
}
