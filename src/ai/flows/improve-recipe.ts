'use server';
/**
 * @fileOverview An AI agent for improving recipes.
 *
 * - improveRecipe - A function that handles the recipe improvement process.
 * - ImproveRecipeInput - The input type for the improveRecipe function.
 * - ImproveRecipeOutput - The return type for the improveRecipe function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ImproveRecipeInputSchema = z.object({
  recipe: z
    .string()
    .describe('The recipe to improve, including ingredients and instructions.'),
  improvementInstructions: z
    .string()
    .describe('Instructions on how to improve the recipe, e.g., "make it healthier", "add more flavor", "make it vegetarian".'),
});
export type ImproveRecipeInput = z.infer<typeof ImproveRecipeInputSchema>;

const ImproveRecipeOutputSchema = z.object({
  improvedRecipe: z.string().describe('The improved recipe.'),
});
export type ImproveRecipeOutput = z.infer<typeof ImproveRecipeOutputSchema>;

export async function improveRecipe(input: ImproveRecipeInput): Promise<ImproveRecipeOutput> {
  return improveRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveRecipePrompt',
  input: {
    schema: z.object({
      recipe: z
        .string()
        .describe('The recipe to improve, including ingredients and instructions.'),
      improvementInstructions: z
        .string()
        .describe('Instructions on how to improve the recipe, e.g., "make it healthier", "add more flavor", "make it vegetarian".'),
    }),
  },
  output: {
    schema: z.object({
      improvedRecipe: z.string().describe('The improved recipe.'),
    }),
  },
  prompt: `You are an expert chef specializing in recipe improvement.

You will improve the given recipe based on the provided instructions.

Recipe: {{{recipe}}}
Improvement Instructions: {{{improvementInstructions}}}

Improved Recipe:`,
});

const improveRecipeFlow = ai.defineFlow<
  typeof ImproveRecipeInputSchema,
  typeof ImproveRecipeOutputSchema
>(
  {
    name: 'improveRecipeFlow',
    inputSchema: ImproveRecipeInputSchema,
    outputSchema: ImproveRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
