export const environment = {
  production: false,
  environmentName: 'Desenvolvimento Local',
  apiGatewayUrl: 'http://localhost:8080/api/v1',
  iotMqttBroker: 'mqtt://localhost:1883',
  featureFlags: {
    yieldPredictionAI: true,
    nightAutonomousPilot: false,
    b3CommoditiesHedging: false
  }
};
