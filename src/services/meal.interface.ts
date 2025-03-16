export interface MealData {
    mealDate: string;
    mealCode: number;
    mealInfo: { dish: string[] | string; cal: string; nutr: string[] | string };
}