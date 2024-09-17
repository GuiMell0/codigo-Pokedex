let pokemonAtual = 1;

const typeColors = {
    fire: '#F08030',
    grass: '#78C850',
    water: '#6890F0',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dark: '#705848',
    dragon: '#7038F8',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    normal: '#A8A878'
};

async function getPokemon(id){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Pokémon não encontrado");
        }
        const data = await response.json();
        mostrarPokemonInfo(data);
        pokemonAtual = data.id
    } catch (error){
        document.getElementById("pokemon-info").innerHTML = `<p>${error.message}</p>`;
    }
}

function mostrarPokemonInfo(pokemon){
    const pokemonInfo = `
    <h2>${pokemon.name.toUpperCase()} (#${pokemon.id})</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p>Altura: ${pokemon.height} cm</p>
    <p>Peso: ${pokemon.weight} kg</p>
    <p>Tipo: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
    `
    document.getElementById("pokemon-info").innerHTML = pokemonInfo;

    const tipoPrincipal = pokemon.types[0].type.name;
    document.body.style.backgroundColor = typeColors[tipoPrincipal];
}

function pokemonAnterior(){
    if (pokemonAtual > 1){
        pokemonAtual --;
        getPokemon(pokemonAtual)
    }
}

function proximoPokemon(){
    pokemonAtual++;
    getPokemon(pokemonAtual);
}

function searchPokemon(){
    const nameOrId = document.getElementById("pokemon-name").value.toLowerCase();
    if (nameOrId){
        getPokemon(nameOrId);
    }
}

getPokemon(pokemonAtual);