
import { PokemonList } from "./pokemon-list";
import { PokemonSearchForm } from "./pokemon-search-form";

export class PokemonView {
    constructor(hostElement: HTMLElement) {
        new PokemonSearchForm(hostElement as HTMLDivElement);
        new PokemonList(hostElement);
    }
}