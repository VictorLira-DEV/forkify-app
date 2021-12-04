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
    try {
        const res = await fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
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
        console.log(state.recipe)
    } catch (err) {
        console.log(err);
    }
};
