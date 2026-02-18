import { supabase } from '@/lib/supabase';

/**
 * Initialize the database with recipes table and sample data
 * This function checks if recipes exist and only runs setup if table is empty
 */
export async function initializeDatabase() {
  try {
    // Check if recipes table exists and has data
    const { count } = await supabase
      .from('recipes')
      .select('*', { count: 'exact', head: true });

    if ((count ?? 0) > 0) {
      console.log('[v0] Database already initialized with recipes');
      return;
    }

    console.log('[v0] Initializing database...');

    // Create recipes table if it doesn't exist
    const { error: createError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.recipes (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          cuisine TEXT NOT NULL,
          rating NUMERIC(3,1) NOT NULL DEFAULT 5.0,
          total_time INTEGER NOT NULL,
          prep_time INTEGER NOT NULL,
          cook_time INTEGER NOT NULL,
          description TEXT NOT NULL,
          serves INTEGER NOT NULL,
          ingredients JSONB DEFAULT '[]'::jsonb,
          instructions JSONB DEFAULT '[]'::jsonb,
          nutrients JSONB DEFAULT '{}'::jsonb,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_recipes_cuisine ON public.recipes(cuisine);
        CREATE INDEX IF NOT EXISTS idx_recipes_rating ON public.recipes(rating DESC);
        CREATE INDEX IF NOT EXISTS idx_recipes_total_time ON public.recipes(total_time);
        CREATE INDEX IF NOT EXISTS idx_recipes_created_at ON public.recipes(created_at DESC);
      `,
    });

    if (createError && !createError.message.includes('already exists')) {
      console.error('[v0] Error creating table:', createError);
    }

    // Insert sample recipes
    const sampleRecipes = [
      {
        title: 'Spaghetti Carbonara',
        cuisine: 'Italian',
        rating: 4.8,
        total_time: 30,
        prep_time: 10,
        cook_time: 20,
        description:
          'Classic Italian pasta with creamy egg sauce and crispy bacon',
        serves: 4,
        ingredients: [
          { name: 'Spaghetti', amount: '400g' },
          { name: 'Eggs', amount: '4' },
          { name: 'Bacon', amount: '200g' },
          { name: 'Parmesan', amount: '100g' },
          { name: 'Salt', amount: 'to taste' },
        ],
        instructions: [
          {
            step: 1,
            instruction: 'Cook spaghetti in boiling salted water',
          },
          { step: 2, instruction: 'Fry bacon until crispy' },
          { step: 3, instruction: 'Mix eggs with grated parmesan' },
          {
            step: 4,
            instruction: 'Toss hot pasta with bacon and egg mixture',
          },
        ],
        nutrients: { calories: '450', protein: '18g', carbs: '45g', fat: '20g' },
      },
      {
        title: 'Chicken Tikka Masala',
        cuisine: 'Indian',
        rating: 4.7,
        total_time: 45,
        prep_time: 20,
        cook_time: 25,
        description:
          'Tender chicken in a rich and creamy tomato-based sauce with aromatic spices',
        serves: 4,
        ingredients: [
          { name: 'Chicken Breast', amount: '600g' },
          { name: 'Yogurt', amount: '200ml' },
          { name: 'Tomato Sauce', amount: '400ml' },
          { name: 'Onions', amount: '2' },
          { name: 'Garlic', amount: '4 cloves' },
          { name: 'Ginger', amount: '1 inch' },
        ],
        instructions: [
          { step: 1, instruction: 'Marinate chicken in yogurt and spices' },
          { step: 2, instruction: 'Cook chicken until golden' },
          { step: 3, instruction: 'Prepare sauce with tomatoes and cream' },
          {
            step: 4,
            instruction: 'Combine chicken with sauce and simmer',
          },
        ],
        nutrients: {
          calories: '380',
          protein: '35g',
          carbs: '15g',
          fat: '18g',
        },
      },
      {
        title: 'Pad Thai',
        cuisine: 'Thai',
        rating: 4.6,
        total_time: 25,
        prep_time: 10,
        cook_time: 15,
        description:
          'Stir-fried noodles with shrimp, tofu, and peanuts in a tangy sauce',
        serves: 2,
        ingredients: [
          { name: 'Rice Noodles', amount: '300g' },
          { name: 'Shrimp', amount: '200g' },
          { name: 'Eggs', amount: '2' },
          { name: 'Peanuts', amount: '50g' },
          { name: 'Lime', amount: '1' },
          { name: 'Tamarind Paste', amount: '2 tbsp' },
        ],
        instructions: [
          { step: 1, instruction: 'Soak rice noodles' },
          { step: 2, instruction: 'Heat wok and cook shrimp' },
          { step: 3, instruction: 'Add noodles and vegetables' },
          { step: 4, instruction: 'Toss with tamarind sauce' },
        ],
        nutrients: {
          calories: '420',
          protein: '22g',
          carbs: '52g',
          fat: '14g',
        },
      },
      {
        title: 'Beef Tacos',
        cuisine: 'Mexican',
        rating: 4.5,
        total_time: 20,
        prep_time: 5,
        cook_time: 15,
        description:
          'Seasoned ground beef in warm tortillas with fresh toppings',
        serves: 4,
        ingredients: [
          { name: 'Ground Beef', amount: '500g' },
          { name: 'Tortillas', amount: '8' },
          { name: 'Lettuce', amount: '1 head' },
          { name: 'Tomato', amount: '2' },
          { name: 'Cheese', amount: '200g' },
          { name: 'Salsa', amount: '1 cup' },
        ],
        instructions: [
          { step: 1, instruction: 'Brown ground beef with spices' },
          { step: 2, instruction: 'Warm tortillas' },
          { step: 3, instruction: 'Chop vegetables' },
          { step: 4, instruction: 'Assemble tacos with toppings' },
        ],
        nutrients: {
          calories: '380',
          protein: '25g',
          carbs: '35g',
          fat: '16g',
        },
      },
      {
        title: 'Caesar Salad',
        cuisine: 'Italian',
        rating: 4.4,
        total_time: 15,
        prep_time: 15,
        cook_time: 0,
        description:
          'Crisp romaine lettuce with creamy Caesar dressing and parmesan cheese',
        serves: 2,
        ingredients: [
          { name: 'Romaine Lettuce', amount: '1 head' },
          { name: 'Parmesan', amount: '100g' },
          { name: 'Croutons', amount: '100g' },
          { name: 'Caesar Dressing', amount: '150ml' },
          { name: 'Lemon', amount: '1' },
        ],
        instructions: [
          { step: 1, instruction: 'Wash and chop romaine' },
          { step: 2, instruction: 'Prepare Caesar dressing' },
          { step: 3, instruction: 'Toss salad with dressing' },
          { step: 4, instruction: 'Top with croutons and parmesan' },
        ],
        nutrients: {
          calories: '320',
          protein: '12g',
          carbs: '18g',
          fat: '22g',
        },
      },
    ];

    // Insert recipes
    const { error: insertError } = await supabase
      .from('recipes')
      .insert(sampleRecipes);

    if (insertError) {
      console.error('[v0] Error inserting sample recipes:', insertError);
    } else {
      console.log('[v0] Database initialized successfully');
    }
  } catch (error) {
    console.error('[v0] Database initialization error:', error);
  }
}
