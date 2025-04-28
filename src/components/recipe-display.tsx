"use client";

import type { GenerateRecipeFromPhotoOutput } from '@/ai/flows/generate-recipe-from-photo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UtensilsCrossed, ListOrdered, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface RecipeDisplayProps {
  recipe: GenerateRecipeFromPhotoOutput | null;
  isLoading: boolean;
  className?: string;
}

export function RecipeDisplay({ recipe, isLoading, className }: RecipeDisplayProps) {
  if (isLoading) {
    return <RecipeSkeleton className={className} />;
  }

  if (!recipe) {
    return null; // Don't render anything if there's no recipe and not loading
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6" />
          {recipe.recipeName || 'Generated Recipe'}
        </CardTitle>
        {recipe.servingSize && (
          <CardDescription className="flex items-center gap-1 text-muted-foreground pt-1">
            <Users className="h-4 w-4" />
            Serves: {recipe.servingSize}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-carrot"><path d="M2.4 14.5c.9.9 2.1 1.4 3.6 1.4 3 0 5.5-2.5 5.5-5.5 0-1.5-.5-2.7-1.4-3.6C8.2 5 0 5 0 5s0 8.2 1.9 10.1c0 0 .5-.5.5-.5z"/><path d="M14.5 2.4c.9-.9 2.1-1.4 3.6-1.4 3 0 5.5 2.5 5.5 5.5 0 1.5-.5 2.7-1.4 3.6-1.9 1.9-10.1 1.9-10.1 1.9s5-8.2 5-10.1.5-.5.5-.5z"/><path d="m12.5 7.5 1 1"/><path d="m11.5 9.5 1 1"/><path d="m10.5 11.5 1 1"/></svg>
             Ingredients
          </h3>
          {recipe.ingredients?.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 pl-2 text-foreground/90">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No ingredients listed.</p>
          )}
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
             <ListOrdered className="h-5 w-5" />
             Instructions
          </h3>
          {recipe.instructions?.length > 0 ? (
            <ol className="space-y-3 list-decimal list-outside pl-6 text-foreground/90">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="leading-relaxed">{instruction}</li>
              ))}
            </ol>
          ) : (
            <p className="text-muted-foreground">No instructions provided.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


function RecipeSkeleton({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <Skeleton className="h-8 w-3/5 mb-2" />
        <Skeleton className="h-4 w-1/4" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Skeleton className="h-6 w-1/3 mb-3" />
          <div className="space-y-2 pl-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <Separator />
        <div>
          <Skeleton className="h-6 w-1/3 mb-4" />
           <div className="space-y-3 pl-6">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
