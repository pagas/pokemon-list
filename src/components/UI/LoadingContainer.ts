import { Pokemon } from "../../types/pokemon";
import { BaseComponent } from "../pokemon/base-component";
import { fetchPokemonAbilities } from "../../api/pokemon";

export class LoadingContainer {
    private element: HTMLElement;

    constructor() {
        this.element = document.getElementById("loading-container");
    }


    showLoading() {
        this.element.style.display = "block";
    }

    hideLoading() {
        this.element.style.display = "none";
    }

}

