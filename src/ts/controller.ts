import * as model from '../ts/model';
import recipeView from './views/recipeView';
import '../sass/main.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe')!;

// https://forkify-api.herokuapp.com/v2

const controlRecipe = async function () {
    try {
        const id = window.location.hash.slice(1);
        // if (!id) return;
        recipeView.renderSpinner();
        await model.loadRecipe(id);
        // rendering recipees
        recipeView.render(model.state.recipe);
    } catch (err) {
        recipeView.renderError();
    }
};

const controlSearchResults = async function () {
    try {
        await model.loadSearchResults('pizza');
        console.log(model.state.search.results)
    } catch (err) {
        console.error(err);
    }
};

controlSearchResults()

// Publisher-Subscriber Pattern
const init = function () {
    recipeView.addHandlerRender(controlRecipe);
};
init();
