export interface IRecipe {
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
