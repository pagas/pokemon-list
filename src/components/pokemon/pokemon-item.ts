import { BaseComponent } from "./base-component";
import { Pokemon } from "../../types/pokemon";


export class PokemonItem extends BaseComponent<HTMLElement, HTMLElement> {
    private pokemon: Pokemon;

    constructor(hostElement: HTMLElement, pokemon: Pokemon) {
        super(
            "pokemon-item",
            hostElement,
            false
        );
        this.pokemon = pokemon;
        this.configure()
        this.renderContent();
    }

    configure() {
        this.element.setAttribute('data-pokemon-id', String(this.pokemon.id));
    }

    renderContent() {
        const titleElement = this.element.querySelector("h2");
        const imageElement = this.element.querySelector("img");
        const typesElement = this.element.querySelector(".types");
        const heightElement = this.element.querySelector(".height");

        imageElement.src = this.pokemon.imgUrl;
        imageElement.alt = `Pokemon ${this.pokemon.name}`;
        titleElement.textContent = this.pokemon.name;
        typesElement.textContent = this.pokemon.types.join(", ");
        heightElement.textContent = this.pokemon.height.toString();
    }
}
