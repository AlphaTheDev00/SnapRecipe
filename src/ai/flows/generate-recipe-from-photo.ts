'use server';
/**
 * @fileOverview Generates a recipe from a photo of ingredients.
 *
 * - generateRecipeFromPhoto - A function that handles the recipe generation process.
 * - GenerateRecipeFromPhotoInput - The input type for the generateRecipeFromPhoto function.
 * - GenerateRecipeFromPhotoOutput - The return type for the generateRecipeFromPhoto function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateRecipeFromPhotoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of ingredients, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateRecipeFromPhotoInput = z.infer<typeof GenerateRecipeFromPhotoInputSchema>;

const GenerateRecipeFromPhotoOutputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe.'),
  ingredients: z.array(z.string()).describe('A list of ingredients for the recipe.'),
  instructions: z.array(z.string()).describe('A list of instructions for the recipe.'),
  servingSize: z.string().describe('The serving size of the recipe.'),
});
export type GenerateRecipeFromPhotoOutput = z.infer<typeof GenerateRecipeFromPhotoOutputSchema>;

export async function generateRecipeFromPhoto(input: GenerateRecipeFromPhotoInput): Promise<GenerateRecipeFromPhotoOutput> {
  return generateRecipeFromPhotoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipeFromPhotoPrompt',
  input: {
    schema: z.object({
      photoDataUri: z
        .string()
        .describe(
          "A photo of ingredients, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        ),
    }),
  },
  output: {
    schema: z.object({
      recipeName: z.string().describe('The name of the recipe.'),
      ingredients: z.array(z.string()).describe('A list of ingredients for the recipe.'),
      instructions: z.array(z.string()).describe('A list of instructions for the recipe.'),
      servingSize: z.string().describe('The serving size of the recipe.'),
    }),
  },
  prompt: `You are a world-class chef. A user will provide you with a photo of ingredients, and you will respond with a recipe using those ingredients.

Respond with:
* recipeName - The name of the recipe.
* ingredients - A list of ingredients required to make the recipe.
* instructions - A list of numbered instructions to make the recipe.
* servingSize - The serving size of the recipe

Ingredients Photo: {{media url=photoDataUri}}
`,
});

const generateRecipeFromPhotoFlow = ai.defineFlow<
  typeof GenerateRecipeFromPhotoInputSchema,
  typeof GenerateRecipeFromPhotoOutputSchema
>(
  {
    name: 'generateRecipeFromPhotoFlow',
    inputSchema: GenerateRecipeFromPhotoInputSchema,
    outputSchema: GenerateRecipeFromPhotoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
