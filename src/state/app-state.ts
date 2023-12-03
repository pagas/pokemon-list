import { BaseState } from "./base-state";
import { Pokemon, PokemonData } from "../types/pokemon";
import { PokemonModal } from "../components/UI/pokemon-modal";
import { fetchPokemons, fetchPokemonTypes } from "../api/pokemon";
import { LoadingContainer } from "../components/UI/LoadingContainer";

import ls from 'localstorage-slim';

class AppState extends BaseState<Pokemon> {
    private static instance: AppState;

    private pokemons: Pokemon[] = [];
    private modal: PokemonModal;
    private pokemonTypes: string[];
    private loadingContainer: LoadingContainer;

    private constructor() {
        super();
        this.modal = new PokemonModal();
        this.loadingContainer = new LoadingContainer();
    }

    static getInstance(): AppState {
        if (!this.instance) {
            this.instance = new AppState();
        }
        return this.instance;
    }

    async loadData() {
        const promises = [fetchPokemons(151), fetchPokemonTypes()]
        this.loadingContainer.showLoading();
        const response = await Promise.all(promises);
        this.loadingContainer.hideLoading();
        this.pokemons = response[0] as Pokemon[];
        this.pokemonTypes = response[1] as string[];
    }

    triggerSearch(seachText: string, maxHeight: number, type: string) {
        this.updateListeners(seachText, maxHeight, type);
    }

    previewPokemon(pokemonId: number) {
        const pokemon = this.pokemons.find((pokemon: Pokemon) => pokemon.id === pokemonId);
        this.modal.showModal(pokemon);
    }

    getPokemonTypes() {
        return this.pokemonTypes;
    }

    updateListeners(saerchText: string = '', height: number = 0, type: string = '') {
        const pokemons = this.pokemons.filter(pokemon => {
            return (!saerchText || pokemon.name.toLowerCase().includes(saerchText.toLowerCase()))
                && (!type || pokemon.types.includes(type))
                && (height == 0 || pokemon.height == height);
        })

        for (const listenerFn of this.listeners) {
            listenerFn(pokemons);
        }
    }

}

export const appState = AppState.getInstance();

