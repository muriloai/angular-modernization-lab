# Angular | Modernization Lab

Laboratório comparativo demonstrando a evolução do Angular entre a versão 15 e a versão 22. Este repositório apresenta os mesmos cenários e conceitos técnicos implementados de forma espelhada em ambos os projetos.

---

## Requisitos de Ambiente

Devido às diferenças nos motores de compilação e dependências do framework, cada projeto requer uma versão específica do Node.js:

- **lab-v15 | Angular 15**: Requer **Node.js 18.x** - baseado em NgModule, Zone.js e Webpack.
- **lab-v22 | Angular 22**: Requer **Node.js 20.x ou superior** - baseado em Standalone, Signals, Zoneless e Vite/esbuild.

Você pode usar um gerenciador de versões como `nvm`, `fnm` ou similar para alternar entre as versões do Node.js _(opcional)_.

---

## Como Executar ?

### Angular 15

Certifique-se de estar utilizando o Node.js 18:

```bash
cd lab-v15
npm install
npm start
```

Acesso local: `http://localhost:4200`

### Angular 22

Certifique-se de estar utilizando o Node.js 20 ou superior:

```bash
cd lab-v22
npm install
npm start
```

Acesso local: `http://localhost:4201`

---
