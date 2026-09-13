# Angular Modernization Lab

Laboratório didático comparando a evolução do Angular entre a versão 15 (clássica) e a versão 22 (moderna).

O projeto adota uma abordagem de conceitos isolados. Cada pasta dentro de `concepts/` representa um tema específico de estudo com dois mini-projetos independentes:
- `v15/`: Implementação clássica com `NgModule`, Zone.js e Webpack.
- `v22/`: Implementação moderna com Standalone, Signals, Zoneless e Vite/esbuild.

---

## Estrutura do Repositório

```text
angular-modernization-lab/
├── README.md
├── package.json
├── shared-assets/
│   └── mock-data.json
└── concepts/
    └── 01-project-structure/
        ├── README.md
        ├── v15/
        └── v22/
```

O repositório evolui de forma gradual. Novos conceitos são adicionados progressivamente em pastas dedicadas.

---

## Requisitos de Ambiente

- **Angular 15 (`v15`)**: Requer Node.js 18.
- **Angular 22 (`v22`)**: Requer Node.js 20 ou superior.

Você pode utilizar gerenciadores de versão como `nvm` ou `fnm` para alternar entre as versões do Node.js.

---

## Como Executar

Cada conceito possui seu próprio `package.json` e pode ser executado de forma independente:

### Angular 15 (`v15`)
```bash
cd concepts/01-project-structure/v15
npm install
npm start
```
Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)
```bash
cd concepts/01-project-structure/v22
npm install
npm start
```
Acesse em: `http://localhost:4201`
