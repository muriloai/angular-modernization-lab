import { InjectionToken } from '@angular/core';

export interface FeatureFlags {
  yieldPredictionAI: boolean;
  nightAutonomousPilot: boolean;
  b3CommoditiesHedging: boolean;
}

export interface AppEnvironment {
  production: boolean;
  environmentName: string;
  apiGatewayUrl: string;
  iotMqttBroker: string;
  defaultFeatureFlags: FeatureFlags;
}

export const APP_ENVIRONMENT = new InjectionToken<AppEnvironment>('APP_ENVIRONMENT');

export const defaultProductionEnv: AppEnvironment = {
  production: true,
  environmentName: 'Produção Fazenda Santa Maria (v22)',
  apiGatewayUrl: 'https://api.fazendasantamaria.agr.br/v1',
  iotMqttBroker: 'wss://mqtt.fazendasantamaria.agr.br:8883',
  defaultFeatureFlags: {
    yieldPredictionAI: true,
    nightAutonomousPilot: true,
    b3CommoditiesHedging: true
  }
};
