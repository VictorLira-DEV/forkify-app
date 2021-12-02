import '../sass/main.scss';
import img from '../img/icons.svg';

console.log(img);
interface IRecipe {
    id: string;
    title: string;
    publisher: string;
    sourceUrl: string;
    image: string;
    servings: number;
    cookingTime: number;
    ingredients: {
        quantity: number;
        description: string;
        unit: string;
    }[];
}

const recipeContainer = document.querySelector('.recipe')!;

const timeout = function (seconds: number) {
    return new Promise(function (_, reject) {
        setTimeout(() => {
            reject(
                new Error(
                    `Request took too long! Timeout after ${seconds} second`
                )
            );
        }, seconds * 1000);
    });
};

// https://forkify-api.herokuapp.com/v2

const showRecipe = async function () {
    try {
        //loading recipees

        const res = await fetch(
            'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
        );
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        let dataTransformed = data.data.recipe;
        console.log(dataTransformed);
        dataTransformed = {
            id: dataTransformed.id,
            title: dataTransformed.title,
            publisher: dataTransformed.publisher,
            sourceUrl: dataTransformed.source_url,
            image: dataTransformed.image_url,
            servings: dataTransformed.servings,
            cookingTime: dataTransformed.cooking_time,
            ingredients: dataTransformed.ingredients,
        };
        let recipe: IRecipe = { ...dataTransformed };
        console.log(recipe);

        //rendering recipees
        const markup = `
                <figure class="recipe__fig">
                    <img src="${recipe.image}" alt="${
            recipe.title
        }" class="recipe__img" />
                    <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                    </h1>
                </figure>

                <div class="recipe__details">
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="${img}#icon-clock"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--minutes">${
                            recipe.cookingTime
                        }</span>
                        <span class="recipe__info-text">minutes</span>
                    </div>
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="${img}#icon-users"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--people">${
                            recipe.servings
                        }</span>
                        <span class="recipe__info-text">servings</span>

                        <div class="recipe__info-buttons">
                            <button class="btn--tiny btn--increase-servings">
                            <svg>
                                <use href="${img}#icon-minus-circle"></use>
                            </svg>
                            </button>
                            <button class="btn--tiny btn--increase-servings">
                            <svg>
                                <use href="${img}#icon-plus-circle"></use>
                            </svg>
                            </button>
                        </div>
                    </div>

                    <div class="recipe__user-generated">
                        <svg>
                            <use href="${img}#icon-user"></use>
                        </svg>
                    </div>
                    <button class="btn--round">
                        <svg class="">
                            <use href="${img}#icon-bookmark-fill"></use>
                        </svg>
                    </button>
                </div>

                <div class="recipe__ingredients">
                    <h2 class="heading--2">Recipe ingredients</h2>
                    <ul class="recipe__ingredient-list">
                        ${recipe.ingredients
                            .map(item => {
                                return `<li class="recipe__ingredient">
                            <svg class="recipe__icon">
                                <use href="${img}#icon-check"></use>
                            </svg>
                            <div class="recipe__quantity">${item.quantity}</div>
                            <div class="recipe__description">
                                <span class="recipe__unit">${item.unit}</span>
                                ${item.description}
                            </div>
                        </li>`;
                            })
                            .join('')}
                    </ul>
                </div>

                <div class="recipe__directions">
                    <h2 class="heading--2">How to cook it</h2>
                        <p class="recipe__directions-text">
                        This recipe was carefully designed and tested by
                        <span class="recipe__publisher">${
                            recipe.publisher
                        }</span>. Please check out
                        directions at their website.
                    </p>
                    <a
                        class="btn--small recipe__btn"
                        href="${recipe.sourceUrl}"
                        target="_blank"
                        >
                        <span>Directions</span>
                        <svg class="search__icon">
                            <use href="${img}#icon-arrow-right"></use>
                        </svg>
                    </a>
                </div>
            `;
        recipeContainer.innerHTML = ' ';
        recipeContainer.insertAdjacentHTML('afterbegin', markup);
    } catch (err) {
        alert(err);
    }
};

showRecipe();
