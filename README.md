# PokeQuizz

<p align="center">
  <img src="src/app/assets/pikachu.gif" alt="Pikachu" />
</p>

ACESSE: [Poké Quiz](https://poke-quizz-eta.vercel.app/)

Um jogo de quiz sobre Pokemons desenvolvido com Next.js. Teste seus conhecimentos sobre os tipos de Pokemon e descubra novos.

## Funcionalidades

- Quiz com perguntas aleatorias sobre Pokemons
- Selecao de tipos de Pokemon para filtrar as perguntas
- API propria que consome a PokeAPI para gerar perguntas
- Interface com animacoes e efeitos typing
- Escute Musicas da série enquanto tempa bater seu recorde

## Tecnologias

- **Next.js 15** — framework React com App Router
- **React 19** — biblioteca de interface
- **Tailwind CSS 4** — estilizacao utilitaria
- **Framer Motion** — animacoes
- **PokeAPI** — dados dos Pokemons

## Como rodar

```bash
# Instalar dependencias
npm install

# Rodar em desenvolvimento
npm run dev

# Build de producao
npm run build

# Iniciar servidor de producao
npm start
```

## Estrutura

```
src/
├── app/
│   ├── api/pokemon/route.js   # API do quiz (busca perguntas da PokeAPI)
│   ├── components/
│   │   └── ChatBallon.jsx     # Componente de balao com typewriter
│   ├── assets/
│   │   └── pikachu.gif        # Gif do Pikachu
│   ├── layout.jsx
│   └── page.jsx
├── ...
```

## API

**GET /api/pokemon?type={tipo}**

Retorna um Pokemon aleatorio do tipo informado com 3 opcoes (1 correta + 2 erradas) para o quiz.

### Exemplo de resposta

```json
{
  "name": "pikachu",
  "id": 25,
  "types": ["electric"],
  "sprite": "https://...",
  "options": ["pikachu", "raichu", "diglett"]
}
```
