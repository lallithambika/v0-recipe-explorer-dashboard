'use client';

import { Recipe } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star } from 'lucide-react';

interface RecipesTableProps {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
  isLoading?: boolean;
}

export default function RecipesTable({
  recipes,
  onRecipeClick,
  isLoading = false,
}: RecipesTableProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="border-b border-border hover:bg-muted/50">
            <TableHead className="font-semibold text-foreground w-1/3">
              Recipe
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Cuisine
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Rating
            </TableHead>
            <TableHead className="font-semibold text-foreground">Time</TableHead>
            <TableHead className="font-semibold text-foreground">Serves</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow
              key={recipe.id}
              onClick={() => onRecipeClick(recipe)}
              className="cursor-pointer hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
            >
              <TableCell className="font-medium text-foreground py-4">
                <div className="space-y-1">
                  <div className="font-semibold">{recipe.title}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {recipe.description}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {recipe.cuisine}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-foreground">
                    {recipe.rating.toFixed(1)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.total_time}m</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{recipe.serves}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
