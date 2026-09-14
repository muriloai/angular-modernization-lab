import { Injectable, inject, signal } from '@angular/core';
import { APP_ENVIRONMENT, FeatureFlags } from './app-environment';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {
  private env = inject(APP_ENVIRONMENT);

  // Flags gerenciadas reativamente por Signals
  readonly flags = signal<FeatureFlags>({ ...this.env.defaultFeatureFlags });

  toggleFlag(flagKey: keyof FeatureFlags): void {
    this.flags.update(current => ({
      ...current,
      [flagKey]: !current[flagKey]
    }));
  }

  resetFlags(): void {
    this.flags.set({ ...this.env.defaultFeatureFlags });
  }
}
