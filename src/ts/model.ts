import { API_URL } from './config';
import * as helper from './helper';
import { IRecipe } from './interface';

interface ISearch {
    query: string;
    results: {
        id: string;
        title: string;
        publisher: string;
        image: string;
    }[];
}

export const state = {
    recipe: {} as IRecipe,
    search: {} as ISearch,
};

export const loadRecipe = async function (id: string) {
    try {
        // const data = await getJson(`${API_URL}${id}`)
        const data = await helper.getJson(`${API_URL}5ed6604591c37cdc054bc886`);
        let dataTransformed = data.data.recipe;
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
        state.recipe = { ...dataTransformed };
    } catch (err) {
        console.log(`${err} * * * haha`);
        throw err;
    }
};

export const loadSearchResults = async function (query: string) {
    try {
        state.search.query = query;
        const res = await helper.getJson(`${API_URL}?search=${query}`);
        const data = [...res.data.recipes];

        state.search.results = data.map((rec) => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });
    } catch (err) {
        console.log(`${err} * * * haha`);
        throw err;
    }
};

