import { API_URL } from './config';
import { getJson } from './helper'

interface IRecipe {
    id?: string;
    title?: string;
    publisher?: string;
    sourceUrl?: string;
    image?: string;
    servings?: number;
    cookingTime?: number;
    ingredients?: {
        quantity?: number;
        description?: string;
        unit?: string;
    }[];
}

export const state: {recipe: IRecipe} = {
    recipe: {}
};

export const loadRecipe = async function (id: string) {
    console.log('ok')
    try {
        // const data = await getJson(`${API_URL}/${id}`)
        const data = await getJson(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`)
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
        throw(err)
    }
};
