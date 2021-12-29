import * as model from './model';
import recipeView from './views/recipeView';
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
        alert(error);
    }
};

// controlRecipe();
['hashchange', 'load'].forEach(event =>
    window.addEventListener(event, controlRecipe)
);