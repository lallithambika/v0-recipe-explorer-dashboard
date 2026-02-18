# Cuisine Share - Quick Start (5 Minutes)

## What You Need
- Node.js 18+ installed
- pnpm package manager
- Supabase account (free at supabase.com)

## Step 1: Get Supabase Credentials (2 min)

1. Visit [supabase.com](https://supabase.com) and sign up (free)
2. Create a new project (wait 1-2 minutes for provisioning)
3. Go to **Settings → API**
4. Copy these two values:
   - `Project URL` 
   - `anon public` key

## Step 2: Configure Environment (1 min)

1. In the project root, create `.env.local`
2. Paste this:
```
NEXT_PUBLIC_SUPABASE_URL=paste_your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

## Step 3: Install & Run (2 min)

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

3. Open browser to `http://localhost:3000`
4. Done! The app will auto-create the database and load recipes

## What's Ready to Use

- Browse 20+ recipes from around the world
- Search by recipe name or description
- Filter by cuisine, rating, and cooking time
- Click recipes to see full details, ingredients, and instructions
- View nutritional information
- Dark mode support
- Mobile-responsive design

## Key Features

| Feature | Details |
|---------|---------|
| **Search** | Real-time recipe search by name/description |
| **Filter** | Cuisine type, rating, cooking time |
| **Details** | Ingredients, instructions, nutrition, cooking times |
| **Pagination** | Browse 10 recipes at a time |
| **Responsive** | Works on desktop, tablet, mobile |
| **Dark Mode** | Automatic based on system preferences |

## Common Tasks

### Search for a recipe
1. Type in the "Search recipes..." box
2. Results update instantly

### Filter by cuisine
1. Click the "Cuisine" dropdown
2. Select Italian, Indian, Thai, etc.

### View recipe details
1. Click any recipe in the table
2. Drawer slides out with full details
3. Scroll to see ingredients, instructions, nutrition

### Switch to next page
1. Click "Next" button at bottom
2. Page indicator shows current position

## File Structure (Important)

```
├── app/
│   ├── page.tsx          ← Main page (recipes homepage)
│   ├── layout.tsx        ← App layout
│   └── globals.css       ← Styling & colors
├── components/recipes/   ← Recipe UI components
├── lib/
│   ├── supabase.ts       ← Database connection
│   └── api/              ← Recipe functions
├── public/               ← Logo & assets
├── scripts/              ← Database setup SQL
├── .env.local            ← Your environment variables (create this)
└── package.json          ← Dependencies
```

## Troubleshooting

### "Recipes not loading"
- Check `.env.local` has correct Supabase credentials
- Go to Supabase dashboard and verify project is active
- Open browser console (F12) for error messages

### "Table doesn't exist"
- App automatically creates it on first load
- Wait 10 seconds and refresh the page
- Check Supabase SQL Editor to see tables

### "No recipes showing"
- App auto-seeds sample recipes on first run
- Try refreshing the page
- Check that recipes table is populated in Supabase

### Styling looks broken
- Clear browser cache (Ctrl+Shift+R)
- Restart the dev server (`pnpm dev`)
- Check that globals.css imported in layout.tsx

## Next Steps

Once running locally:

1. **Explore the code**
   - Check `components/recipes/recipes-page.tsx` for main logic
   - View `lib/api/recipes-service.ts` for database queries
   - See `app/globals.css` for styling and colors

2. **Customize**
   - Add more recipe data to Supabase
   - Modify colors in `app/globals.css`
   - Update the logo in `public/logo.png`

3. **Deploy**
   - Read [DEPLOY.md](./DEPLOY.md) for step-by-step instructions
   - Recommended: Deploy to Vercel (free, takes 5 minutes)

4. **Extend Features**
   - Add user authentication
   - Enable saving favorite recipes
   - Add recipe ratings and comments
   - Allow users to submit recipes

## Sample Data Included

The app comes with 20+ recipes:
- 🇮🇹 Italian: Pasta, Risotto, Pizza, Salads
- 🇮🇳 Indian: Tikka Masala, Green Curry
- 🇹🇭 Thai: Pad Thai, Tom Yum Soup
- 🇲🇽 Mexican: Tacos, Enchiladas
- 🇬🇧 British: Fish and Chips
- 🇫🇷 French: Beef Bourguignon, Bouillabaisse
- 🇯🇵 Japanese: Sushi, Ramen
- 🇵🇪 Peruvian: Ceviche
- And more!

Each recipe has ingredients, instructions, and nutritional info.

## Need Help?

Check these files in order:
1. **QUICKSTART.md** ← You are here
2. **SETUP.md** ← Detailed setup guide
3. **README.md** ← Full documentation
4. **DEPLOY.md** ← Deployment instructions
5. **IMPLEMENTATION.md** ← Technical details

## Performance

- Loads in under 2 seconds
- Database queries are optimized with indexes
- Pagination prevents slow loading
- Search is debounced for efficiency
- Images are optimized with Next.js

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS 14+, Android 7+)

## That's It!

You now have a fully functional recipe app running locally. To deploy to the internet, follow the steps in [DEPLOY.md](./DEPLOY.md).

Happy cooking! 👨‍🍳

---

**Cuisine Share** - Discover & Share Recipes with the World
