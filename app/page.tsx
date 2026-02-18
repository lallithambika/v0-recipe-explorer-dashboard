import Image from 'next/image';
import RecipesPage from '@/components/recipes/recipes-page';

export const metadata = {
  title: 'Cuisine Share - Discover & Share Recipes',
  description: 'Discover and share delicious recipes from around the world on Cuisine Share',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Cuisine Share"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Cuisine Share
                </h1>
                <p className="text-xs text-muted-foreground">
                  Discover & Share Recipes
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <RecipesPage />
      </div>
    </main>
  );
}
