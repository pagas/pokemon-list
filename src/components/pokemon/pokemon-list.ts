import { Pokemon } from "../../types/pokemon";
import { PokemonItem } from "./pokemon-item";
import { appState } from "../../state/app-state";
import { BaseComponent } from "./base-component";

export class PokemonList extends BaseComponent<HTMLElement, HTMLElement> {
    pokemons: Pokemon[] = [];
    ulElement: HTMLUListElement;

    constructor(hostElement: HTMLElement) {
        super(
            "pokemon-list",
            hostElement,
            false
        );

        this.configure();
    }


    renderContent() {
        this.ulElement.innerHTML = "";
        for (const pokemon of this.pokemons) {
            const pokemonItem = new PokemonItem(this.ulElement, pokemon);
        }
    }

    clickPokemonHandler(event: MouseEvent) {
        if (!(event.target instanceof HTMLElement)) {
            return;
        }
        const listItem = event.target.closest('li');
        if (!listItem) {
            return;
        }
        appState.previewPokemon(Number(listItem.dataset.pokemonId));
    }

    configure() {
        this.ulElement = this.element.querySelector('ul');
        this.ulElement.addEventListener('click', this.clickPokemonHandler);
        appState.addListener((pokemons) => {
            this.pokemons = pokemons;
            this.renderContent();
        })
    }
}

