export interface Ingredient {
  name: string;
  amount: string;
}

export interface Instruction {
  step: number;
  instruction: string;
}

export interface Nutrients {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Recipe {
  id: string;
  title: string;
  cuisine: string;
  rating: number;
  total_time: number;
  prep_time: number;
  cook_time: number;
  description: string;
  serves: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutrients: Nutrients;
  created_at: string;
  updated_at: string;
}

export interface FilterParams {
  search?: string;
  cuisine?: string;
  minRating?: number;
  maxTime?: number;
  page?: number;
  limit?: number;
}

export interface RecipesResponse {
  data: Recipe[];
  count: number;
  page: number;
  total_pages: number;
  error?: string;
}
