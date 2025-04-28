"use client";

import type { GenerateRecipeFromPhotoOutput } from '@/ai/flows/generate-recipe-from-photo';
import { useState } from 'react';
import { generateRecipeFromPhoto } from '@/ai/flows/generate-recipe-from-photo';
import { ImageUpload } from '@/components/image-upload';
import { RecipeDisplay } from '@/components/recipe-display';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [selectedImageDataUri, setSelectedImageDataUri] = useState<string | null>(null);
  const [generatedRecipe, setGeneratedRecipe] = useState<GenerateRecipeFromPhotoOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageSelect = (dataUri: string | null) => {
    setSelectedImageDataUri(dataUri);
    // Clear previous results when a new image is selected or removed
    setGeneratedRecipe(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedImageDataUri) {
      setError("Please select an image first.");
      toast({
        title: "Error",
        description: "Please select an image before generating a recipe.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedRecipe(null); // Clear previous recipe before new generation

    try {
      const result = await generateRecipeFromPhoto({ photoDataUri: selectedImageDataUri });
      setGeneratedRecipe(result);
      toast({
        title: "Success!",
        description: "Recipe generated successfully.",
      });
    } catch (err) {
      console.error("Error generating recipe:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred while generating the recipe.";
      setError(`Failed to generate recipe: ${errorMessage}`);
      toast({
        title: "Generation Failed",
        description: `Could not generate recipe. ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-2 tracking-tight">SnapRecipe</h1>
        <p className="text-lg text-muted-foreground">Turn your ingredient photos into delicious recipes!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageUpload
          onImageSelect={handleImageSelect}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          className="h-fit" // Make upload card fit its content
        />

        <div className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <RecipeDisplay
            recipe={generatedRecipe}
            isLoading={isLoading}
            className="transition-opacity duration-500 ease-in-out"
          />
        </div>
      </div>

      <footer className="text-center mt-16 text-muted-foreground text-sm">
        <p>Powered by AI magic ✨</p>
      </footer>
    </main>
  );
}
