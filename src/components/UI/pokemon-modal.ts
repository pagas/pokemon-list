import { Pokemon } from "../../types/pokemon";
import { BaseComponent } from "../pokemon/base-component";
import { fetchPokemonAbilities } from "../../api/pokemon";

export class PokemonModal extends BaseComponent<HTMLBodyElement, HTMLDivElement> {
    private pokemon: Pokemon;
    private abilities: { name: string, short_effects: string[] }[];


    constructor() {
        super(
            "pokemon-modal",
            document.querySelector("body")
        );
        this.configure();
    }

    showModal(pokemon: Pokemon) {
        this.pokemon = pokemon;

        const abilityUrls = this.pokemon.abilities.map(abilityItem => {
            return abilityItem.ability.url;
        })
        fetchPokemonAbilities(abilityUrls).then((abilities) => {
            this.abilities = abilities;
            this.renderContent();
        });
    }

    closeModal() {
        this.element.style.display = "none";
    }

    getAbilityNames() {
        return this.pokemon.abilities.map(abilityItem => {
            return abilityItem.ability.name;
        })
    }

    configure() {
        const span: HTMLElement = this.element.querySelector('.close');

        // When the user clicks on <span> (x), close the modal
        span.onclick = () => {
            this.closeModal();
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = (event) => {
            if (event.target == this.element) {
                this.closeModal();
            }
        }
    }

    renderContent(): void {
        this.element.style.display = "block";
        const title: HTMLElement = this.element.querySelector('.pokemon-title');
        if (title.childNodes.length > 1) {
            title.childNodes[0].replaceWith(document.createTextNode(this.pokemon.name))
        } else {
            title.prepend(document.createTextNode(this.pokemon.name));
        }

        const pokemonNumber: HTMLSpanElement = this.element.querySelector('.pokemon-number');
        pokemonNumber.textContent = `#${this.pokemon.id}`;

        const pokemonImage: HTMLImageElement = this.element.querySelector('.pokemon-image');
        pokemonImage.src = this.pokemon.imgUrl;
        pokemonImage.alt = `Pokemon ${this.pokemon.name}`

        const pokemonHeight: HTMLElement = this.element.querySelector('.height');
        pokemonHeight.textContent = this.pokemon.height.toString();

        const pokemonType: HTMLElement = this.element.querySelector('.pokemonType');
        pokemonType.textContent = this.pokemon.types.join(", ");

        const abilitiesElement: HTMLUListElement = this.element.querySelector('.abilities');
        abilitiesElement.innerHTML = '';

        this.abilities.map(ability => {
            const li: HTMLLIElement = document.createElement('li');
            li.textContent = ability.short_effects.join(", ")
            abilitiesElement.appendChild(li);
        })

    }
}

