'use client';

import { useState, useCallback, useEffect } from 'react';
import { getRecipes, getCuisines } from '@/lib/api/recipes-service';
import { initializeDatabase } from '@/lib/api/init-db';
import { Recipe, FilterParams, RecipesResponse } from '@/lib/types';
import FiltersBar from './filters-bar';
import RecipesTable from './recipes-table';
import RecipeDrawer from './recipe-drawer';
import SkeletonLoader from './skeleton-loader';
import EmptyState from './empty-state';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [filters, setFilters] = useState<Partial<FilterParams>>({
    cuisine: 'all',
    minRating: 0,
    maxTime: 300,
  });
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Initialize database and fetch cuisines on mount
  useEffect(() => {
    async function initializeApp() {
      // Initialize database if needed
      await initializeDatabase();
      
      // Load available cuisines
      const data = await getCuisines();
      setCuisines(data);
    }
    initializeApp();
  }, []);

  // Fetch recipes when filters or page changes
  const loadRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response: RecipesResponse = await getRecipes(page, 10, filters);
      if (response.error) {
        setError(response.error);
        setRecipes([]);
      } else {
        setRecipes(response.data);
        setTotalPages(response.total_pages);
        setTotalCount(response.count);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load recipes');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const handleFilterChange = (newFilters: Partial<FilterParams>) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setDrawerOpen(true);
  };

  const handleRetry = () => {
    loadRecipes();
  };

  return (
    <div className="w-full space-y-6">
      <FiltersBar
        onFilterChange={handleFilterChange}
        cuisines={cuisines}
        currentFilters={filters}
      />

      {loading && recipes.length === 0 ? (
        <SkeletonLoader />
      ) : error && recipes.length === 0 ? (
        <EmptyState
          title="Error loading recipes"
          description={error}
          onRetry={handleRetry}
        />
      ) : recipes.length === 0 ? (
        <EmptyState
          title="No recipes found"
          description="Try adjusting your filters to find more recipes."
        />
      ) : (
        <>
          <div className="text-sm text-muted-foreground">
            Showing {recipes.length} of {totalCount} recipes
          </div>
          <RecipesTable
            recipes={recipes}
            onRecipeClick={handleRecipeClick}
            isLoading={loading}
          />

          {/* Pagination */}
          <div className="flex items-center justify-between gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              Previous
            </button>

            <div className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || loading}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}

      {selectedRecipe && (
        <RecipeDrawer
          recipe={selectedRecipe}
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
        />
      )}
    </div>
  );
}
