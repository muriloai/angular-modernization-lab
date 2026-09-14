# Conceito 39: Error Boundaries e Resiliencia de Interface

Demonstracao de padroes de resiliencia de interface e contencao de falhas em widgets isolados na Fazenda Santa Maria, contrastando o tratamento global com `ErrorHandler` no Angular 15 com a criacao de componentes reutilizaveis de Error Boundary e contencao local orientada a Signals no Angular 22.

---

## Contexto do Negocio (AgroTech)

Na **Fazenda Santa Maria**, o Centro de Operacoes Integradas monitora o painel de clima e sensoriamento remoto, composto por tres fontes independentes de dados:
1. **Estacao Agrometeorologica** (temperatura, radiacao solar e umidade).
2. **Telemetria de Drones de Monitoramento** (altitude, bateria e cobertura de voo).
3. **Sensores de Cameras Multiespectrais** (dispositivo critico suscetivel a falhas de transmissao de hardware).

Se o sensor da camera multiespectral falhar ou lancar uma excecao, o operador do centro nao pode perder o acesso aos dados da estacao meteorologica nem aos drones de monitoramento.
* No **Angular 15**, a plataforma depende exclusivamente de um `ErrorHandler` global. Excecoes em templates ou durante o ciclo de Change Detection nao possuem isolamento nativo por componente, podendo corromper o estado da arvore ou demandar try/catch imperativo em cada metodo.
* No **Angular 22**, o padrao de **Error Boundary** e implementado de forma modular e declarativa. O componente encapsula o widget sensivel em sua projecao de conteudo (`ng-content`), gerencia estados reativos de falha com `signal()` e expoe um painel de contingencia com opcao de recuperacao (`retry`), isolando completamente a falha sem interromper os demais modulos da fazenda.

---

## Comparativo Tecnico

| Aspecto | Legado (Angular 15) | Moderno (Angular 22) |
| :--- | :--- | :--- |
| **Tratamento Padrao** | `ErrorHandler` global na aplicacao | Composicao modular com componentes de Error Boundary locais |
| **Impacto de Falha de Componente** | Risco de cascata no ciclo do `zone.js` e perda de renderizacao | Falha contida no container do widget, preservando a pagina |
| **Feedback de Recuperacao** | Recarregar pagina inteira (F5) | Botao local de reinicializacao (`retry`) acionando Signals |
| **Declaratividade** | Diretivas estruturais ad-hoc ou try/catch dispersos | Componente de contencao reutilizavel com projecao e fallback |
| **Integracao Reativa** | Variaveis booleanas e flags locais | Sinais reativos sincronizados em arquitetura Zoneless |

---

## Estrutura do Exemplo

```text
39-error-boundaries/
├── v15/                         # Aplicacao Angular 15
│   ├── src/
│   │   ├── app/
│   │   │   ├── services/global-error-handler.ts
│   │   │   ├── components/
│   │   │   │   ├── weather-widget.component.ts
│   │   │   │   ├── drone-widget.component.ts
│   │   │   │   └── multispectral-widget.component.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.component.html
│   │   │   ├── app.component.css
│   │   │   └── app.module.ts
│   │   ├── main.ts
│   │   ├── polyfills.ts
│   │   └── styles.css
│   ├── angular.json
│   └── package.json
└── v22/                         # Aplicacao Angular 22
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── error-boundary.ts            # Componente de contencao resiliente
    │   │   │   ├── error-boundary.html
    │   │   │   ├── error-boundary.css
    │   │   │   ├── weather-widget.ts
    │   │   │   ├── drone-widget.ts
    │   │   │   └── multispectral-widget.ts      # Widget com simulacao de falha
    │   │   ├── app.ts
    │   │   ├── app.html
    │   │   ├── app.css
    │   │   └── app.config.ts
    │   ├── main.ts
    │   └── styles.css
    ├── angular.json
    └── package.json
```

---

## Como Executar

### Versao Angular 15 (`v15`)
Porta padrao: `4200`
```bash
cd concepts/39-error-boundaries/v15
npm install
npm start
```

### Versao Angular 22 (`v22`)
Porta configurada: `4201`
```bash
cd concepts/39-error-boundaries/v22
npm install
npm start
```
