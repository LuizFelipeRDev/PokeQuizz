export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (!type) {
    return new Response(JSON.stringify({ message: "Tipo não informado" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // 1 - Pega todos os pokémons desse tipo
    const resType = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    if (!resType.ok) {
      return new Response(JSON.stringify({ message: "Tipo inválido" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const dataType = await resType.json();

    // Lista de pokémons
    const pokemons = dataType.pokemon.map((p) => p.pokemon.name);

    // 2 - Sorteia um pokémon correto
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    const correctPokemon = pokemons[randomIndex];

    // 3 - Busca detalhes do pokémon sorteado
    const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${correctPokemon}`);
    const dataPokemon = await resPokemon.json();

    // 4 - Monta opções (1 correta + 2 erradas)
    let options = [correctPokemon];
    while (options.length < 3) {
      const randomWrong = pokemons[Math.floor(Math.random() * pokemons.length)];
      if (!options.includes(randomWrong)) {
        options.push(randomWrong);
      }
    }

    // 5 - Embaralha as opções
    options = options.sort(() => Math.random() - 0.5);

    // 6 - Monta resposta final
    const result = {
      name: dataPokemon.name,
      id: dataPokemon.id,
      types: dataPokemon.types.map((t) => t.type.name),
      sprite: dataPokemon.sprites.other["official-artwork"].front_default,
      options,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Erro ao buscar Pokémon" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
