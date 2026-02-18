import { supabase } from '@/lib/supabase';
import { Recipe, FilterParams, RecipesResponse } from '@/lib/types';

export async function getRecipes(
  page: number = 1,
  limit: number = 10,
  filters?: Partial<FilterParams>
): Promise<RecipesResponse> {
  try {
    const offset = (page - 1) * limit;
    let query = supabase
      .from('recipes')
      .select('*', { count: 'exact' })
      .order('rating', { ascending: false });

    // Apply filters
    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      );
    }

    if (filters?.cuisine && filters.cuisine !== 'all') {
      query = query.eq('cuisine', filters.cuisine);
    }

    if (filters?.minRating) {
      query = query.gte('rating', filters.minRating);
    }

    if (filters?.maxTime) {
      query = query.lte('total_time', filters.maxTime);
    }

    const { data, count, error } = await query
      .range(offset, offset + limit - 1);

    if (error) {
      return {
        data: [],
        count: 0,
        page,
        total_pages: 0,
        error: error.message,
      };
    }

    const total_pages = count ? Math.ceil(count / limit) : 0;

    return {
      data: (data || []) as Recipe[],
      count: count || 0,
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
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching recipe:', error);
      return null;
    }

    return data as Recipe;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

export async function getCuisines(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('cuisine')
      .distinct();

    if (error) {
      console.error('Error fetching cuisines:', error);
      return [];
    }

    const cuisines = (data || [])
      .map((item: { cuisine: string }) => item.cuisine)
      .filter(Boolean)
      .sort();

    return cuisines;
  } catch (error) {
    console.error('Error fetching cuisines:', error);
    return [];
  }
}
