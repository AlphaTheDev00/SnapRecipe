# 🍳 SnapRecipe - AI-Powered Recipe Generator

![SnapRecipe Banner](https://i.imgur.com/XYZ123.png)

## 📝 Description

SnapRecipe is a modern web application that uses AI to generate recipes from photos of ingredients. Built with Next.js and TypeScript, this project leverages Google's Gemini AI to analyze food images and create detailed recipes. The application features a clean, responsive design and provides users with an intuitive interface to upload photos and receive AI-generated recipes.

## 🚀 Deployment Link

**Live Site:** [SnapRecipe App](https://snaprecipe.netlify.app)

## 💻 Getting Started/Code Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google AI API Key

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/snaprecipe.git

# Navigate to the project directory
cd snaprecipe

# Install dependencies
npm install

# Create .env file with your API keys
touch .env

# Start the development server
npm run dev
```

## ⏱️ Timeframe & Working Team

**Timeframe:** 1 week

**Project Type:** Solo project

## 🛠️ Technologies Used

### Frontend
- Next.js 15.2.3
- TypeScript
- Tailwind CSS
- Radix UI Components
- React Hooks
- Lucide Icons

### AI & Backend
- Google Gemini AI
- Genkit AI Framework
- Server Actions
- Netlify Serverless Functions

### Development Tools
- Git & GitHub
- Netlify
- VS Code
- Chrome DevTools

## 📋 Brief

The project brief required creating a modern web application that:
- Uses AI to generate recipes from photos
- Provides a clean and intuitive user interface
- Handles image uploads and processing
- Generates detailed recipes with ingredients and instructions
- Deploys to a production environment

## 📐 Planning

### Component Hierarchy

```
App
├── Layout
│   ├── Header
│   └── Footer
├── Pages
│   └── Home
└── Components
    ├── ImageUpload
    ├── RecipeDisplay
    └── UI Components
        ├── Alert
        ├── Button
        └── Card
```

### User Stories

- As a user, I want to upload a photo of ingredients
- As a user, I want to generate a recipe from my photo
- As a user, I want to see a detailed recipe with ingredients and instructions
- As a user, I want to get clear error messages if something goes wrong

## 🔨 Build/Code Process

### Image Upload Component

The image upload component handles file selection and preview:

```typescript
export function ImageUpload({ onImageSelect, onSubmit, isLoading, className }: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Convert to data URI for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Upload Ingredients Photo</CardTitle>
        <CardDescription>
          Take a photo of your ingredients to generate a recipe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={onSubmit}
          disabled={!selectedFile || isLoading}
          className="w-full"
        >
          {isLoading ? 'Generating Recipe...' : 'Generate Recipe'}
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Recipe Generation with AI

The recipe generation process uses Google's Gemini AI:

```typescript
export async function generateRecipeFromPhoto(input: GenerateRecipeFromPhotoInput): Promise<GenerateRecipeFromPhotoOutput> {
  const { output } = await prompt(input);
  return output!;
}

const prompt = ai.definePrompt({
  name: 'generateRecipeFromPhotoPrompt',
  input: {
    schema: z.object({
      photoDataUri: z.string().describe(
        "A photo of ingredients, as a data URI that must include a MIME type and use Base64 encoding."
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
  prompt: `You are a world-class chef. A user will provide you with a photo of ingredients, and you will respond with a recipe using those ingredients.`,
});
```

## 🧩 Challenges

### AI Integration

One of the biggest challenges was integrating the Google Gemini AI API and handling the image processing. The solution involved:
- Properly formatting the image data for the AI model
- Handling API responses and errors
- Implementing proper loading states

### Server Actions

Implementing Server Actions in Next.js for the AI processing required careful configuration and error handling. The solution involved:
- Setting up proper API routes
- Handling CORS issues
- Implementing proper error boundaries

## 🏆 Wins

### Clean UI/UX

The application features a clean, modern interface with:
- Intuitive image upload
- Clear loading states
- Responsive design
- Error handling with toast notifications

### AI Recipe Generation

Successfully implemented AI-powered recipe generation with:
- Accurate ingredient recognition
- Detailed recipe instructions
- Proper serving size calculations

## 🎓 Key Learnings/Takeaways

### Next.js Server Actions

Learned how to effectively use Server Actions for:
- API route handling
- Server-side processing
- Error handling

### AI Integration

Gained experience in:
- Integrating AI APIs
- Processing image data
- Handling AI responses

### TypeScript Best Practices

Improved understanding of:
- Type safety
- Interface design
- Error handling

## 🐛 Bugs

- Occasionally, the AI might not recognize all ingredients in complex photos
- Image upload might fail with very large files
- Recipe generation might take longer than expected with complex images

## 🔮 Future Improvements

- **Recipe History**: Save generated recipes for future reference
- **User Accounts**: Allow users to save their favorite recipes
- **Recipe Sharing**: Enable users to share recipes with others
- **Ingredient Substitution**: Suggest ingredient alternatives
- **Nutritional Information**: Add nutritional facts to recipes
- **Multiple Language Support**: Generate recipes in different languages
- **Recipe Categories**: Organize recipes by type (breakfast, dinner, etc.)
- **Cooking Timer**: Add a timer feature for recipe steps

---

## 📱 Connect With Me

- [GitHub](https://github.com/your-username)
- [LinkedIn](https://www.linkedin.com/in/yassinechikar/)
- [Portfolio](https://yassinechportfolio.netlify.app/)

---

*This project was created as a demonstration of AI integration in web applications.*
