# Conceito 36: Zoneless Deep Dive e Renderizacao Direta

Demonstracao aprofundada do funcionamento interno e do impacto arquitetural da eliminacao do `zone.js` no ecossistema Angular moderno, comparando a abordagem tradicional baseada em interceptacao e monkey-patching com o modelo puramente reativo por Signals da versao 22.

---

## Contexto do Negocio (AgroTech)

Na **Fazenda Santa Maria**, a central de controle hidroagricola monitora continuamente mais de 40 pivos centrais de irrigacao. Cada pivo transmite pacotes de telemetria em alta frequencia contendo pressao de bicos, vazao hidrica em litros por segundo, voltagem de motores de tracao e angulo de curso em tempo real.

O processamento e exibicao desses fluxos continuos de telemetria expoe claramente as diferencas entre os modelos de deteccao de mudancas:
* No **Angular 15**, a presenca do `zone.js` intercepta todo evento de timer e websocket. Cada atualizacao dispara ciclos globais de verificacao na arvore de componentes, gerando sobrecarga de CPU, repeticao de checagens desnecessarias e exigindo chamadas explicitas a `NgZone.runOutsideAngular()`.
* No **Angular 22**, o modo puramente Zoneless (`provideZonelessChangeDetection()`) opera sem interceptar APIs globais do navegador. As mutacoes notificam apenas os componentes consumidores de Signals, agendando microtarefas nativas diretas e garantindo estabilidade e baixo consumo de memoria.

---

## Comparativo Tecnico

| Caracteristica | Legado (Angular 15) | Moderno (Angular 22) |
| :--- | :--- | :--- |
| **Biblioteca de Interceptacao** | `zone.js` obrigatorio no `polyfills.ts` | Desnecessario e removido do build |
| **Mecanismo de Deteccao** | Monkey-patching de eventos assincronos e ciclo de tick global | Agendamento nativo via microtarefas disparadas por Signals |
| **Sobrecarga de Alta Frequencia** | Elevada (Zone Pollution), exigindo `runOutsideAngular()` | Minima, cada atualizacao aciona apenas dependencias ativas |
| **Consumo de Memoria do Bundle** | Inclui runtime do Zone (~35-45 KB minificado) | Zero bytes de overhead de monkey-patching |
| **Previsibilidade de Execucao** | Risco de chamadas `ApplicationRef.tick()` em cascata | Atualizacoes sincronizadas com o ciclo de renderizacao nativo |

---

## Estrutura do Exemplo

```text
36-zoneless-deep-dive/
├── v15/                         # Aplicacao Angular 15
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts # Telemetria com Zone e execucao fora da zona
│   │   │   ├── app.component.html
│   │   │   ├── app.component.css
│   │   │   └── app.module.ts
│   │   ├── main.ts
│   │   ├── polyfills.ts         # Contem import 'zone.js'
│   │   └── styles.css
│   ├── angular.json
│   └── package.json
└── v22/                         # Aplicacao Angular 22
    ├── src/
    │   ├── app/
    │   │   ├── app.ts           # Telemetria reativa com Signals e microtarefas
    │   │   ├── app.html
    │   │   ├── app.css
    │   │   └── app.config.ts    # provideZonelessChangeDetection()
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
cd concepts/36-zoneless-deep-dive/v15
npm install
npm start
```

### Versao Angular 22 (`v22`)
Porta configurada: `4201`
```bash
cd concepts/36-zoneless-deep-dive/v22
npm install
npm start
```
