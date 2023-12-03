import { BaseComponent } from "./base-component";
import { appState } from "../../state/app-state";

export class PokemonSearchForm extends BaseComponent<HTMLDivElement, HTMLFormElement>{
    private saerchText: HTMLInputElement;
    private heightElement: HTMLInputElement;
    private typesElement: HTMLSelectElement;

    constructor(hostEl: HTMLDivElement) {

        super(
            "pokemon-search-form",
            hostEl,
            false
        );

        this.configure()
        this.renderContent();
    }

    submitForm(e: SubmitEvent) {
        e.preventDefault();
        this.search();
    }

    reset() {
        this.saerchText.value = '';
        this.heightElement.value = '0';
        this.typesElement.value = 'all';
        this.renderContent();
        this.search();
    }

    search() {
        appState.triggerSearch(this.saerchText.value, +this.heightElement.value, this.typesElement.value);
    }

    configure(): void {
        this.saerchText = this.element.querySelector("#searchText");
        this.heightElement = this.element.querySelector("#height");
        this.typesElement = this.element.querySelector("#pokemonTypes");
        const resetButton: HTMLButtonElement = this.element.querySelector("#resetButton");
        resetButton.onclick = this.reset.bind(this);

        this.element.onsubmit = this.submitForm.bind(this);
    }

    renderContent(): void {
        const types = ['all', ...appState.getPokemonTypes()];

        this.typesElement.innerHTML = '';

        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type === 'all' ? '' : type;
            option.textContent = type;
            this.typesElement.appendChild(option)
        })
    }

}