import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import '../sass/main.scss';
// with this we make sure that most real old browser are being supported by our app
import 'core-js/stable';
import 'regenerator-runtime';
// https://forkify-api.herokuapp.com/v2

const controlRecipe = async function () {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;
        recipeView.renderSpinner();
        await model.loadRecipe(id);

        //2 renders
        recipeView.render(model.state.recipe);
    } catch (error) {
        console.log(error);
        recipeView.renderError();
    }
};

const controlSearchResult = async function () {
    try {
        resultsView.renderSpinner();
        const query = searchView.getQuery();
        
        if (!query) return;

        await model.loadSearchResults(query);
        resultsView.render(model.getSearchResultsPage(3));

        //initial pagination buttons
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
};

const controlPagination = function (goToPage) {
    resultsView.render(model.getSearchResultsPage(goToPage));

    //initial pagination buttons
    paginationView.render(model.state.search);
};

// Event Handlers in MVC: Publisher-Subscriber Pattern
const init = function () {
    recipeView.addHandlerRender(controlRecipe);
    searchView.addHandlerSearch(controlSearchResult);
    paginationView.addHandlerClick(controlPagination);
};
init();
