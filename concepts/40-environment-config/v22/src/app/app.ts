import { Component, signal, inject } from '@angular/core';
import { APP_ENVIRONMENT, FeatureFlags } from './config/app-environment';
import { FeatureFlagsService } from './config/feature-flags.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  readonly env = inject(APP_ENVIRONMENT);
  private flagsService = inject(FeatureFlagsService);

  title = signal('Fazenda Santa Maria - Parametrização de Ambientes (v22 - InjectionToken & Signals)');

  // Exposição do Signal de Feature Flags
  readonly flags = this.flagsService.flags;

  toggle(flag: keyof FeatureFlags): void {
    this.flagsService.toggleFlag(flag);
  }

  reset(): void {
    this.flagsService.resetFlags();
  }
}
