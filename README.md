# Calculadora de Tarifário Hospedin

Mini aplicação em React para o desafio técnico da Hospedin. A especificação completa pode ser consultada na Basecamp: Desafio Técnico: Calculadora de Tarifário. Em resumo:

- **Contexto:** tarifários definem quanto o hóspede paga por sua estadia e podem incluir regras de estadia mínima, valores diferenciados e descontos de longa permanência.
- **Objetivo:** construir uma calculadora em React que permita selecionar a acomodação, definir check-in/check-out, informar adultos e obter o resumo do valor total (nome da acomodação, noites, diárias, taxa de limpeza e total). Deve validar períodos inválidos ou inferiores ao mínimo de noites.
- **Regras:** Suíte Jardim (R$ 300/noite, mínimo 2 noites, limpeza R$ 80) e Chalé Família (R$ 450/noite, mínimo 2 noites, limpeza R$ 100); finais de semana têm acréscimo de 20% na diária; estadias acima de 7 noites recebem 10% de desconto.
- **Requisitos técnicos:** React + hooks/componentização simples, função separada (`calculateTarifario`), README detalhado com instruções e decisões. Bônus: validação de datas, layout responsivo, feedback de loading/erros.
- **Entrega e avaliação:** projeto em repositório público, prazo sugerido de 4 dias, avaliando clareza de raciocínio, boas práticas e capacidade de traduzir regras em lógica funcional.

## Como rodar

```bash
yarn install
yarn dev        # ambiente de desenvolvimento
yarn test       # testes unitários (Vitest + Testing Library)
yarn test:e2e   # smoke/E2E com Playwright (sobe o Vite automaticamente)
yarn test:coverage # gera relatório V8 e exige cobertura ≥ 80% em src
yarn lint       # ESLint com regras type-checked
yarn format     # Prettier nos arquivos de código/estilo
yarn build      # build de produção
```

Commits locais passam por `lint-staged` via Husky (`pre-commit`) **e** por `yarn test:coverage`. A cobertura é calculada somente sobre `src` e o commit falha automaticamente se linhas/declarações/funções ficarem abaixo de 80%.

## Regras implementadas

- Suíte Jardim (R$ 300/noite, mínimo 2 noites, limpeza R$ 80).
- Chalé Família (R$ 450/noite, mínimo 2 noites, limpeza R$ 100).
- Finais de semana possuem acréscimo de 20% na diária.
- Estadia maior que 7 noites gera desconto de 10% no total (após somar diárias e taxa de limpeza).
- Datas inválidas (check-out ≤ check-in) ou estadia abaixo do mínimo retornam mensagens claras.
- Formulário exige check-in, check-out e número de adultos válido (≥ 1).

## Estrutura

```
src/
 ├─ components/              # Componentes compartilhados (ex: ErrorBanner)
 ├─ features/reservation/    # Regra de negócio e UI da calculadora
 │   ├─ data/accommodations  # Fonte da verdade para regras por acomodação
 │   ├─ utils/calculateTarifario.ts
 │   ├─ components/          # Formulário e resumo
 │   └─ types.ts
 ├─ lib/format.ts            # Helpers de formatação
 ├─ tests/setup.ts           # Setup do Testing Library/Jest-DOM
 ├─ App.tsx                  # Shell da aplicação
 └─ index.css                # Reset + diretivas do Tailwind
```

Aliases `@/*` estão configurados no `tsconfig` e `vite.config.ts` para facilitar importações (`import { ReservationCalculator } from '@/features/reservation'`).

## Decisões técnicas

- **React + Hooks**: `ReservationCalculator` controla o formulário com `useState`, mostrando estado de carregamento e mensagens de erro conforme necessário.
- **Função pura para cálculo**: `calculateTarifario` recebe apenas `Date` e `id` da acomodação, retornando um breakdown completo (diárias, taxa, desconto). Isso facilita os testes unitários (`src/features/reservation/utils/calculateTarifario.test.ts`).
- **Boas práticas de qualidade**:
  - ESLint com regras type-checked, React Compiler + `eslint-plugin-react-x`/`react-dom`.
  - Prettier integrado, Husky + `lint-staged`, Vitest com Testing Library para unidade, Playwright para smoke/E2E.
  - Tailwind CSS para estilização rápida com tokens consistentes e responsivos.
  - `tsconfig` com `baseUrl/paths` para imports limpos via `@`.
- **UX responsiva**: layout em grid com cartões translúcidos, badges para fins de semana, feedback imediato e tipografia consistente com Tailwind.
