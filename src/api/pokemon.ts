import { PokemonData, Pokemon } from "../types/pokemon"
import { pick } from 'lodash';
import ls from 'localstorage-slim';

type PokemonItem = {
    name: string
    url: string
}

type EffectResponse = {
    effect_entries: [{ name: string, language: { name: string }, short_effect: string }]
    name: string
}

export const fetchPokemons = async (limit: number = 10) => {
    let pokemons = ls.get('pokemons');
    if (pokemons) return Promise.resolve(pokemons);

    const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
    const { results } = await reponse.json();

    const allPromises: Promise<PokemonData>[] = []
    results.forEach((pokemon: PokemonItem) => {
        allPromises.push(fetchPokemonData(pokemon.url));
    })
    const pokemonsData = await Promise.all(allPromises);

    pokemons = pokemonsData.map(pokemonsData => {
        return {
            ...pick(pokemonsData, ['id', 'name', 'height', 'weight']),
            imgUrl: pokemonsData.sprites.front_default,
            types: pokemonsData.types.map(({ type }) => type.name),
            abilities: pokemonsData.abilities
        } as Pokemon
    })
    ls.set('pokemons', pokemons);
    return pokemons;
}

const fetchPokemonData = async (pokemonUrl: string) => {
    // Ex: https://pokeapi.co/api/v2/pokemon/1/)
    const response = await fetch(pokemonUrl);
    return await response.json();
}

export const fetchPokemonTypes = async () => {
    let pokemonTypes = ls.get('pokemonTypes');
    if (pokemonTypes) return Promise.resolve(pokemonTypes);

    const response = await fetch('https://pokeapi.co/api/v2/type');
    const { results } = await response.json();
    pokemonTypes = results.map((item: { name: string }) => item.name);
    ls.set('pokemonTypes', pokemonTypes);
    return pokemonTypes;
}


export const fetchPokemonAbilities = async (abilitityUrls: string[]) => {

    const promises: Promise<EffectResponse>[] = abilitityUrls.map(async (url) => {
        let abilityData: EffectResponse = ls.get(url);
        if (abilityData) return Promise.resolve(abilityData);

        const response = await fetch(url)
        abilityData = await response.json();
        ls.set(url, abilityData);
        return abilityData;
    });

    const reseponse = await Promise.all(promises);

    const effects = reseponse.map(({ effect_entries, name }) => {
        const effects = effect_entries.filter(entry => entry.language.name === 'en')
        return { name, short_effects: effects.map(item => item.short_effect) }
    })
    return effects;
}



