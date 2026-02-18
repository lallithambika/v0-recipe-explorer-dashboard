# 🍽️ Cuisine Share

A modern recipe discovery and sharing platform built with Next.js 15, React 19, and Supabase.

![Cuisine Share](public/logo.png)

## ✨ Features

- **🔍 Smart Search & Filter**: Find recipes by title, cuisine type, rating, and cooking time
- **📖 Detailed Recipe Views**: Complete ingredient lists, step-by-step instructions, and nutrition info
- **🌍 Global Cuisines**: Explore recipes from Italian, Indian, Thai, Mexican, French, Japanese, and more
- **⭐ Quality Ratings**: Recipes sorted and filterable by user ratings (3.0+, 4.0+, 4.5+)
- **⏱️ Time Management**: Filter by cooking duration to find quick meals or elaborate dishes
- **🎨 Beautiful UI**: Modern design featuring Cuisine Share's vibrant branding (orange, green, blue)
- **🌓 Dark Mode**: Full dark mode support for comfortable browsing
- **📱 Responsive Design**: Seamless experience on desktop, tablet, and mobile devices
- **⚡ Fast Performance**: Optimized queries with database indexing and pagination

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Supabase account (free tier works great!)

### Installation

1. **Clone or set up the project**
   ```bash
   # If downloading via ZIP
   unzip cuisine-share.zip
   cd cuisine-share
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the project root:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open in browser**
   Visit `http://localhost:3000`

The app will automatically initialize the database with sample recipes on first load!

## 🎯 How to Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Create a new project
3. Wait for it to be provisioned (usually 1-2 minutes)
4. In your project, go to **Settings** → **API**
5. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Paste these into your `.env.local` file

## 📚 Usage

### Browse Recipes
- Open the homepage to see all available recipes
- Recipes are sorted by rating by default (highest first)

### Search
- Use the search bar to find recipes by name or description
- Search updates in real-time as you type

### Filter
- **Cuisine**: Select a specific cuisine type or view all
- **Min Rating**: Filter by quality level (3.0+, 4.0+, 4.5+)
- **Max Time**: Find quick recipes or allow more cooking time (15 min to unlimited)

### View Recipe Details
- Click any recipe to open the detailed view
- See ingredients with quantities
- Follow step-by-step instructions
- Check nutritional information per serving
- View prep and cooking times

### Pagination
- Navigate through results using Previous/Next buttons
- Current page displayed in the center

## 🏗️ Project Structure

```
cuisine-share/
├── app/
│   ├── page.tsx              # Main page with header
│   ├── layout.tsx            # Root layout & metadata
│   ├── globals.css           # Global styles & theme colors
│   └── favicon.ico
├── components/
│   ├── ui/                   # shadcn/ui components
│   └── recipes/
│       ├── recipes-page.tsx  # Main container & state management
│       ├── filters-bar.tsx   # Search & filter controls
│       ├── recipes-table.tsx # Recipe list table
│       ├── recipe-drawer.tsx # Detail view drawer
│       ├── skeleton-loader.tsx # Loading state
│       └── empty-state.tsx   # Empty/error states
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── types.ts             # TypeScript interfaces
│   └── api/
│       ├── recipes-service.ts  # API functions
│       └── init-db.ts       # Database setup
├── public/
│   └── logo.png             # Cuisine Share branding
├── scripts/
│   └── 001_create_recipes.sql # Database schema
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── SETUP.md                 # Detailed setup guide
└── README.md               # This file
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | Tailwind CSS v4, shadcn/ui |
| **Backend** | Supabase (PostgreSQL) |
| **Database Client** | @supabase/supabase-js |
| **Icons** | lucide-react |
| **Forms** | React Hook Form |
| **Utilities** | clsx, date-fns, zod |

## 🎨 Design & Branding

### Color Palette
- **Primary (Orange)**: #FF6B35 - Warmth & food
- **Secondary (Green)**: #4CAF50 - Fresh ingredients
- **Accent (Blue)**: #2196F3 - Global reach
- **Neutrals**: White, grays, black for text & backgrounds

Colors are defined in `app/globals.css` using OKLCH color space for accurate, perceptually-uniform colors.

### Typography
- **Sans-serif**: Geist (system font) for optimal performance
- **Mono**: Geist Mono for code and data
- Clean, readable hierarchy for content

## 📊 Sample Data

The app comes with **20+ sample recipes** covering:
- 🇮🇹 Italian: Spaghetti Carbonara, Risotto, Lasagna
- 🇮🇳 Indian: Chicken Tikka Masala, Green Curry
- 🇹🇭 Thai: Pad Thai, Tom Yum Soup
- 🇲🇽 Mexican: Beef Tacos, Tacos al Pastor, Chiles Rellenos
- 🇬🇧 British: Fish and Chips
- 🇫🇷 French: Beef Bourguignon, Bouillabaisse
- 🇬🇷 Greek: Moussaka
- 🇯🇵 Japanese: Sushi Rolls, Ramen
- 🇵🇪 Peruvian: Ceviche
- And more!

Each recipe includes ingredients, cooking instructions, and nutritional information.

## 🔧 Database Schema

### Recipes Table
```sql
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  cuisine TEXT NOT NULL,
  rating NUMERIC(3,1) DEFAULT 5.0,
  total_time INTEGER NOT NULL,       -- minutes
  prep_time INTEGER NOT NULL,        -- minutes
  cook_time INTEGER NOT NULL,        -- minutes
  description TEXT NOT NULL,
  serves INTEGER NOT NULL,
  ingredients JSONB,                 -- array of {name, amount}
  instructions JSONB,                -- array of {step, instruction}
  nutrients JSONB,                   -- {calories, protein, carbs, fat}
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX idx_recipes_cuisine ON recipes(cuisine);
CREATE INDEX idx_recipes_rating ON recipes(rating DESC);
CREATE INDEX idx_recipes_total_time ON recipes(total_time);
CREATE INDEX idx_recipes_created_at ON recipes(created_at DESC);
```

## 🔄 Data Flow

```
User Interaction
    ↓
RecipesPage Component (state & effects)
    ↓
filters-bar.tsx → User input
recipes-table.tsx ← Recipe data
    ↓
recipes-service.ts (API layer)
    ↓
Supabase Client
    ↓
PostgreSQL Database
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: Cuisine Share"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Add Environment Variables**
   - In Vercel project settings → Environment Variables
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your live URL!

### Deploy to Other Platforms

The app works with any hosting that supports Next.js 15:
- Netlify
- Railway
- Render
- AWS Amplify
- etc.

Just add the same environment variables to your hosting platform.

## 📈 Performance Optimizations

- ✅ Database indexes for fast queries
- ✅ Paginated results (10 recipes per page)
- ✅ Debounced search input
- ✅ Lazy loading with skeleton states
- ✅ Optimized image serving with Next.js Image
- ✅ CSS minification with Tailwind v4
- ✅ Efficient component re-renders with React 19

## 🐛 Troubleshooting

### Recipes not loading?
- **Check environment variables**: Verify `.env.local` has correct Supabase credentials
- **Check Supabase status**: Log into Supabase and verify your project is active
- **Check browser console**: Look for error messages (Ctrl+Shift+J or Cmd+Option+J)
- **Check network tab**: Verify API requests are completing

### Database errors?
- **Table doesn't exist**: The app auto-creates it on first load
- **No data**: Sample recipes auto-seed on first load
- **Permission errors**: Check that `recipes` table has public read access

### Styling issues?
- **Colors look wrong**: Clear browser cache and hard-refresh (Ctrl+Shift+R)
- **Layout broken**: Check that globals.css is imported in layout.tsx
- **Fonts not loading**: This is normal - Geist falls back to system fonts

### Build errors?
- **TypeScript errors**: Run `pnpm build` to see full error details
- **Dependencies missing**: Run `pnpm install` to ensure all packages installed

## 📝 Future Enhancements

- 👤 User authentication & profiles
- ❤️ Save favorite recipes
- 💬 Comments and ratings
- 📸 User-submitted recipes
- 🛒 Shopping list generation
- 📊 Dietary preference filters (vegan, gluten-free, etc.)
- 🔔 Recipe notifications & newsletters
- 🌐 Multi-language support
- 📱 Mobile app (React Native)

## 📄 License

This project is open source and available for educational and personal use.

## 🤝 Contributing

Have ideas? Found a bug? We'd love to hear from you!

## 💬 Support

For help:
1. Check [SETUP.md](./SETUP.md) for detailed setup instructions
2. Review the troubleshooting section above
3. Check your browser console for error messages
4. Verify Supabase credentials in `.env.local`

---

**Happy cooking! 👨‍🍳 Discover and share amazing recipes with Cuisine Share.**
