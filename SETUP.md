# Cuisine Share - Setup Guide

## Overview
Cuisine Share is a recipe discovery and sharing platform built with Next.js 15, React 19, and Supabase.

## Features
- 📚 Browse and search recipes from various cuisines
- ⭐ Filter by rating, cooking time, and cuisine type
- 📖 Detailed recipe view with ingredients, instructions, and nutrition info
- 🎨 Beautiful UI with Cuisine Share branding (orange, green, blue)
- 🌓 Dark mode support
- 📱 Fully responsive design

## Prerequisites
- Node.js 18+ and pnpm
- Supabase account with a project

## Environment Setup

1. **Create a Supabase project** (if you haven't already)
   - Go to [supabase.com](https://supabase.com) and sign in
   - Create a new project
   - Wait for it to be ready

2. **Get your Supabase credentials**
   - In your Supabase project, go to Settings → API
   - Copy `Project URL` and `anon public` key
   - Note these values

3. **Add environment variables**
   - Create a `.env.local` file in the project root
   - Add the following:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## Database Setup

The app includes an automatic database initialization script that:
1. Creates the `recipes` table with proper schema
2. Adds indexes for performance
3. Seeds sample recipe data (5 recipes on first run)

**To set up the database manually:**

1. In Supabase, go to the SQL Editor
2. Copy and paste the SQL from `scripts/001_create_recipes.sql`
3. Run the query

The app will automatically create tables and seed data on first load if they don't exist.

## Installation & Running

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Visit `http://localhost:3000` to see the app.

## Project Structure

```
/
├── app/
│   ├── page.tsx              # Main page with header and RecipesPage
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles with Cuisine Share colors
├── components/
│   └── recipes/
│       ├── recipes-page.tsx  # Main container component
│       ├── filters-bar.tsx   # Filter controls
│       ├── recipes-table.tsx # Data table display
│       ├── recipe-drawer.tsx # Recipe detail drawer
│       ├── skeleton-loader.tsx # Loading state
│       └── empty-state.tsx   # Empty/error state
├── lib/
│   ├── supabase.ts          # Supabase client initialization
│   ├── types.ts             # TypeScript types
│   └── api/
│       ├── recipes-service.ts  # API service functions
│       └── init-db.ts       # Database initialization
├── public/
│   └── logo.png             # Cuisine Share logo
└── scripts/
    └── 001_create_recipes.sql # Database schema

```

## Key Technologies

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Backend**: Supabase (PostgreSQL)
- **Client**: @supabase/supabase-js
- **Icons**: lucide-react

## Color Scheme

The app uses the official Cuisine Share branding colors:
- **Primary (Orange)**: Food and warmth
- **Secondary (Green)**: Fresh ingredients
- **Accent (Blue)**: Global reach

Colors are defined in `app/globals.css` using OKLCH color space for better color accuracy.

## Features & Usage

### Search & Filter
- Search recipes by title or description
- Filter by cuisine type, minimum rating, and maximum cooking time
- Results update in real-time with debouncing

### Recipe View
- Click any recipe to see detailed information
- View ingredients with quantities
- Step-by-step instructions
- Nutritional information per serving
- Cooking times (prep and cook)

### Pagination
- Navigate through results with Previous/Next buttons
- Page indicator shows current position

## Troubleshooting

### Recipes not loading?
1. Check that Supabase environment variables are set correctly
2. Verify Supabase project is accessible
3. Check browser console for error messages
4. Ensure the recipes table exists in your Supabase database

### Database table not created?
1. Check Supabase SQL Editor for errors
2. Manually run the SQL from `scripts/001_create_recipes.sql`
3. Verify the `recipes` table appears in your Supabase Tables list

### Styling issues?
1. Clear browser cache and restart dev server
2. Check that globals.css is properly imported in layout.tsx
3. Verify Tailwind CSS is working (should see spacing and colors)

## Deployment

To deploy to Vercel:

1. Push code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## Future Enhancements

- User authentication and favorites
- Recipe submission/creation
- Rating and comments
- Dietary preference filters
- Recipe sharing and social features
- Recipe scaling by serving size
- Shopping list generation

## Support

For issues or questions, check the console logs and verify:
1. Supabase credentials are correct
2. Database tables exist and have data
3. Network requests are completing successfully
