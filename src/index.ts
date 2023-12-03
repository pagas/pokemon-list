import "./styles/styles.css";

import { appState } from "./state/app-state";
import { PokemonView } from "./components/pokemon/pokemon-view";

(async () => {

    await appState.loadData();
    new PokemonView(document.getElementById("app"));
    // all data and html is loaded run listeners, so components can update accordingly
    appState.updateListeners();

})();
