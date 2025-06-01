import { MealData as NestMealData } from './meal.interface';
import { apiClient } from './api.client';

export async function fetchMeal(date: string) {
    const meal = localStorage.getItem(`meal:${date}`);
    if (meal) return JSON.parse(meal);

    const mealArr = [1, 2, 3].map(async (time) => {
        const { data }: { data: NestMealData } = await apiClient.get(`/meal?date=${date}&code=${time}`);
        const meal = {
            date: data.mealDate,
            data: data.mealInfo.dish,
            nutritions: data.mealInfo.nutr,
            calories: data.mealInfo.cal,
        };
        if (typeof meal.data != 'string') {
            const fuck = meal.data.map((d) => {
                const [dish, dishAllergy = ''] = d.split(' (');
                const allergies = dishAllergy.replace('(', '').replace(')', '');
                return { dish, allergies };
            });
            return { data: fuck };
        } else {
            return null;
        }
    });
    const [breakfast, lunch, dinner] = await Promise.all(mealArr);

    const meals = {
        date,
        breakfast,
        lunch,
        dinner,
    };

    if (meals.breakfast != null || meals.lunch != null || meals.dinner != null) {
        localStorage.setItem(`meal:${date}`, JSON.stringify(meals));
    }

    return meals;
}
