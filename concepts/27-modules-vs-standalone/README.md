# Conceito 27: Modulos vs Standalone Architecture

Este modulo compara a organizacao arquitetural corporativa classica baseada em `NgModule` (`CoreModule`, `SharedModule`, `FeatureModule`) com o paradigma moderno de componentes **Standalone por padrao** introduzido a partir do Angular 14 e consolidado no Angular 22.

No cenario da **Fazenda Santa Maria**, a aplicacao gerencia lotes de colheita de graos (soja, milho e trigo). O objetivo deste laboratorio e demonstrar como o modelo de modulos exigia uma densa camada de intermediacao para disponibilizar servicos e componentes, enquanto a arquitetura moderna baseada em componentes standalone simplifica o grafo de dependencias, melhora o tree-shaking e acelera o ciclo de desenvolvimento.

---

## 1. Visao Comparativa Geral

| Aspecto | Angular 15 (Arquitetura com NgModules) | Angular 22 (Arquitetura Standalone) |
| :--- | :--- | :--- |
| **Declaracao de Componentes** | Obrigacao de declarar componentes em um `NgModule` (`declarations`) | Componentes sao entidades auto-suficientes, sem necessidade de modulos |
| **Escopo de Compilacao** | Compartilhado pelo modulo; todos os componentes do modulo enxergam as importacoes | Granular por componente; cada componente importa exatamente o que consome (`imports`) |
| **Padrao SharedModule** | Obrigatorio para reexportar modulos comuns (`CommonModule`, `FormsModule`) e componentes visuais | Desnecessario e desaconselhado; componentes e diretivas sao importados diretamente |
| **Padrao CoreModule** | Usado para isolar servicos singleton e impedir reimportacao acidental | Substituido por `providedIn: 'root'` e configuracoes em funcoes `provide*()` |
| **Configuracao da Aplicacao** | Classe `AppModule` decorada com `@NgModule` e inicializada via `platformBrowserDynamic` | Objeto de configuracao em `app.config.ts` inicializado via `bootstrapApplication` |
| **Tree-Shaking e Pacotes** | Dificuldade do bundler de eliminar componentes declarados mas nao utilizados no template | Tree-shaking granular e automatico, gerando bundles menores e tempos de carga mais rapidos |

---

## 2. O Modelo Legado: Angular 15

No Angular 15, uma aplicacao corporativa tipicamente adotava o padrao de divisao em tres camadas de modulos:

1. **CoreModule**: Modulo responsavel por carregar servicos de infraestrutura singleton e configuracoes unicas da aplicacao, frequentemente protegido com guarda de instanciacao para evitar reimportacao em modulos carregados tardiamente.
2. **SharedModule**: Modulo que reunia diretivas, pipes e componentes apresentacionais genericos, importando e reexportando `CommonModule`, `FormsModule` e componentes reutilizaveis.
3. **FeatureModule**: Modulo focado em uma funcionalidade de negocio especifica (como `HarvestModule`), declarando seus componentes internos e importando `SharedModule`.

### Desafios do Modelo com NgModules:
- **Efeito bola de neve**: O `SharedModule` frequentemente crescia desordenadamente, forçando a aplicacao a importar dezenas de dependencias em telas que utilizavam apenas um pequeno botao.
- **Dificuldade de rastreamento**: Ao abrir o template de um componente, nao era possivel saber de onde vinha uma determinada diretiva ou componente sem inspecionar o `NgModule` correspondente e seus imports recursivos.
- **Acoplamento desnecessario**: Testes unitarios isolados exigiam configurar o `TestBed` com modulos completos, tornando os testes lentos e complexos de manter.

---

## 3. O Modelo Moderno: Angular 22

No Angular 22, o conceito de `NgModule` e totalmente desnecessario na construcao de novas aplicacoes corporativas:

1. **Standalone por padrao**: A partir do Angular 19, componentes, diretivas e pipes sao standalone por definicao, sem a necessidade de explicitar `standalone: true`.
2. **Imports Granulares**: O proprio decorator `@Component` lista no array `imports` apenas as dependencias necessarias para o seu template (por exemplo, `FormsModule`, `StatusBadge`).
3. **Configuracao via Funcoes**: O roteador, cliente HTTP e deteccao de mudancas sao fornecidos em `app.config.ts` atraves de utilitarios funcionais (`provideRouter`, `provideZonelessChangeDetection`).
4. **Facilidade em Testes**: Cada componente pode ser instanciado em testes unitarios sem a necessidade de instanciar ou mockar modulos inteiros de contexto.

---

## 4. Estrutura dos Projetos

```text
concepts/27-modules-vs-standalone/
|-- README.md
|-- v15/
|   |-- package.json                     (porta 4200)
|   `-- src/app/
|       |-- core/                        (CoreModule e HarvestService singleton)
|       |-- shared/                      (SharedModule e StatusBadgeComponent)
|       |-- features/harvest/            (HarvestModule e HarvestListComponent)
|       `-- app.module.ts                (Modulo raiz consolidando os modulos)
`-- v22/
    |-- package.json                     (porta 4201)
    `-- src/app/
        |-- services/                    (HarvestService com providedIn: 'root')
        |-- components/                  (StatusBadge standalone)
        |-- features/harvest/            (HarvestList standalone importando direto)
        |-- app.config.ts                (Configuracao funcional Zoneless)
        `-- app.ts                       (Componente raiz standalone)
```

---

## 5. Roteiro de Migracao Mental

Para equipes que migram do Angular 15 para o Angular 22:

1. **Eliminar o SharedModule**: Substitua o `SharedModule` importando diretamente os componentes compartilhados (`StatusBadge`, `MetricCard`) no array `imports` dos componentes que deles precisam.
2. **Eliminar o CoreModule**: Se o `CoreModule` apenas continha servicos singleton, certifique-se de que cada servico possui `@Injectable({ providedIn: 'root' })` e remova o modulo.
3. **Desacoplar FeatureModules**: Converta os componentes de feature para standalone e liste rotas diretamente via exportacao de arrays em arquivos de rotas dedicados.
4. **Substituir o AppModule por app.config.ts**: Utilize `bootstrapApplication(AppComponent, appConfig)` em `main.ts`, fornecendo servicos atraves de funcoes `provide*()`.
