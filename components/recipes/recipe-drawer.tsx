'use client';

import { Recipe } from '@/lib/types';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecipeDrawerProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RecipeDrawer({
  recipe,
  open,
  onOpenChange,
}: RecipeDrawerProps) {
  if (!recipe) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <DrawerHeader className="space-y-4 border-b border-border pb-6">
          <div className="space-y-2">
            <DrawerTitle className="text-3xl font-bold text-foreground">
              {recipe.title}
            </DrawerTitle>
            <DrawerDescription className="text-base text-muted-foreground">
              {recipe.description}
            </DrawerDescription>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {recipe.cuisine}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{recipe.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{recipe.total_time} min total</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Serves {recipe.serves}</span>
            </div>
          </div>
        </DrawerHeader>

        <div className="p-6 space-y-8">
          {/* Cooking Times */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Prep Time</div>
              <div className="text-2xl font-bold text-foreground">
                {recipe.prep_time}
              </div>
              <div className="text-xs text-muted-foreground">minutes</div>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Cook Time</div>
              <div className="text-2xl font-bold text-foreground">
                {recipe.cook_time}
              </div>
              <div className="text-xs text-muted-foreground">minutes</div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-primary" />
              Ingredients
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients && recipe.ingredients.map((ingredient, idx) => (
                <li key={idx} className="flex items-start py-2 border-b border-border/30 last:border-b-0">
                  <span className="text-foreground">
                    {typeof ingredient === 'string' ? ingredient : ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Instructions</h3>
            <ol className="space-y-3">
              {recipe.instructions && recipe.instructions.map((instruction, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 text-sm text-foreground"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-xs">
                    {idx + 1}
                  </span>
                  <span>{typeof instruction === 'string' ? instruction : instruction.instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Nutritional Information */}
          {recipe.nutrients && Object.keys(recipe.nutrients).length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Nutrition (per serving)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(recipe.nutrients).map(([key, value]) => (
                  <div key={key} className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-xl font-bold text-foreground mt-1">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border p-6 flex justify-end gap-2 sticky bottom-0 bg-background">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
