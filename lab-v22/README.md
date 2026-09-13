# Angular Modernization Lab — Angular 22

Subprojeto independente implementado com a versão moderna do Angular, servindo como referência prática para os novos paradigmas do ecossistema.

---

## Características Arquiteturais

* Versão do Framework: Angular 22
* Arquitetura de Componentes: Standalone por padrão (sem NgModules)
* Detecção de Mudanças: Zoneless nativo (sem dependência de zone.js)
* Reatividade: Baseada em Signals (signal, computed, effect, resource)
* Motor de Build: Compilação com Vite e esbuild

---

## Requisitos de Ambiente

* Node.js: Versão 20.x ou superior
* Gerenciador de Pacotes: npm

---

## Comandos Disponíveis

Iniciar servidor de desenvolvimento:
```bash
npm start
```
Acesso local padrão: `http://localhost:4200` (ou `http://localhost:4201`)

Compilar versão de produção:
```bash
npm run build
```
Os artefatos compilados são gerados no diretório `dist/`.
