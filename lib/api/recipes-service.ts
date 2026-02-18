import { Recipe, FilterParams, RecipesResponse } from '@/lib/types';
import recipesData from '@/data/recipes.json';

// Convert JSON data format to Recipe format
function convertRecipeData(rawData: any): Recipe[] {
  return Object.values(rawData).map((item: any, index: number) => ({
    id: String(index),
    title: item.title,
    cuisine: item.cuisine,
    rating: item.rating,
    total_time: item.total_time,
    prep_time: item.prep_time,
    cook_time: item.cook_time,
    description: item.description,
    ingredients: item.ingredients,
    instructions: item.instructions,
    nutrients: item.nutrients,
    serves: item.serves,
    URL: item.URL,
    Country_State: item.Country_State,
    Contient: item.Contient,
  }));
}

const allRecipes = convertRecipeData(recipesData);

export async function getRecipes(
  page: number = 1,
  limit: number = 10,
  filters?: Partial<FilterParams>
): Promise<RecipesResponse> {
  try {
    let filtered = [...allRecipes];

    // Apply filters
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchLower) ||
          recipe.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.cuisine && filters.cuisine !== 'all') {
      filtered = filtered.filter((recipe) => recipe.cuisine === filters.cuisine);
    }

    if (filters?.minRating) {
      filtered = filtered.filter((recipe) => recipe.rating >= filters.minRating!);
    }

    if (filters?.maxTime) {
      filtered = filtered.filter((recipe) => recipe.total_time <= filters.maxTime!);
    }

    // Sort by rating descending
    filtered.sort((a, b) => b.rating - a.rating);

    // Pagination
    const count = filtered.length;
    const offset = (page - 1) * limit;
    const paginatedData = filtered.slice(offset, offset + limit);
    const total_pages = Math.ceil(count / limit);

    return {
      data: paginatedData,
      count,
      page,
      total_pages,
    };
  } catch (error) {
    return {
      data: [],
      count: 0,
      page,
      total_pages: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function searchRecipes(
  filters: Partial<FilterParams>
): Promise<RecipesResponse> {
  return getRecipes(filters.page || 1, filters.limit || 10, filters);
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    return allRecipes.find((recipe) => recipe.id === id) || null;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

export async function getCuisines(): Promise<string[]> {
  try {
    const cuisines = [...new Set(allRecipes.map((recipe) => recipe.cuisine))]
      .filter(Boolean)
      .sort();
    return cuisines;
  } catch (error) {
    console.error('Error fetching cuisines:', error);
    return [];
  }
}
