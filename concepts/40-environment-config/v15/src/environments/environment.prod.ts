export const environment = {
  production: true,
  environmentName: 'Produção Fazenda Santa Maria',
  apiGatewayUrl: 'https://api.fazendasantamaria.agr.br/v1',
  iotMqttBroker: 'wss://mqtt.fazendasantamaria.agr.br:8883',
  featureFlags: {
    yieldPredictionAI: true,
    nightAutonomousPilot: true,
    b3CommoditiesHedging: true
  }
};
