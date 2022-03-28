import * as model from './model';
import { MODAL_CLOSE_SEC } from './config';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import bookmarksView from './views/bookMarksView';
import paginationView from './views/paginationView';
import addRecipeView from './views/addRecipeView';

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
        // 0 update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage());
        bookmarksView.update(model.state.bookMarks);

        await model.loadRecipe(id);

        //2 renders
        recipeView.render(model.state.recipe);

        //TEST
        // controlServings();
    } catch (error) {
        recipeView.renderError();
    }
};

const controlSearchResult = async function () {
    try {
        resultsView.renderSpinner();
        const query = searchView.getQuery();

        if (!query) return;

        await model.loadSearchResults(query);
        resultsView.render(model.getSearchResultsPage(1));

        //initial pagination buttons
        paginationView.render(model.state.search);
    } catch (err) {}
};

const controlPagination = function (goToPage) {
    resultsView.render(model.getSearchResultsPage(goToPage));

    //initial pagination buttons
    paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
    //update the recipes servings (is state)
    model.updateServings(newServings);
    //update the recipe view
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
    //add remove bookmark
    if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);
    // update recipe view
    recipeView.update(model.state.recipe);

    //Render Book Mark
    bookmarksView.render(model.state.bookMarks, true);
};

const controlBookmarks = function () {
    bookmarksView.render(model.state.bookMarks);
};

const controlAddRecipe = async function (newRecipe) {
    try {
        //Show loading spinner
        addRecipeView.renderSpinner();

        await model.uploadRecipe(newRecipe);
        console.log(model.state.recipe);
        //render recipe
        recipeView.render(model.state.recipe);

        // Success message
        addRecipeView.renderMessage();
        //Render bookmark view
        bookmarksView.render(model.state.bookMarks);

        //Change ID in the URL
        window.history.pushState(null, '', `#${model.state.recipe.id}`);
        // window.history.back()

        //Close form window
        setTimeout(() => {
            addRecipeView.toggleWindow();
        }, MODAL_CLOSE_SEC * 1000);
    } catch (err) {
        console.log('8)' + err);
        addRecipeView.renderError(err.message);
    }

    //Upload the new recipe data
};

// Event Handlers in MVC: Publisher-Subscriber Pattern
const init = function () {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipe);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResult);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
