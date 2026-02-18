# Deployment Guide - Cuisine Share

## Quick Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

**Step 1: Push code to GitHub**
```bash
git init
git add .
git commit -m "Cuisine Share - Recipe Discovery App"
git remote add origin https://github.com/YOUR_USERNAME/cuisine-share.git
git push -u origin main
```

**Step 2: Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your GitHub repository
5. Click "Import"

**Step 3: Add Environment Variables**
1. In the Vercel dashboard, go to your project settings
2. Navigate to "Environment Variables"
3. Add these variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
   ```
4. Click "Save"

**Step 4: Deploy**
1. Click the "Deploy" button
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app is now live! Click the "Visit" button to see it

### Option 2: Deploy to Netlify

**Step 1: Connect GitHub to Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Select GitHub and authorize
4. Choose your cuisine-share repository
5. Click "Deploy site"

**Step 2: Configure Build Settings**
- Build command: `pnpm build`
- Publish directory: `.next`

**Step 3: Add Environment Variables**
1. In Netlify, go to Site Settings
2. Click "Build & deploy" → "Environment"
3. Add the same environment variables as Vercel
4. Trigger a new deploy

### Option 3: Deploy to Other Platforms

The app works with any hosting that supports Next.js 15:

**Railway, Render, AWS Amplify:**
1. Connect your GitHub repository
2. Select Next.js as the framework
3. Add environment variables
4. Deploy

**Docker (for custom servers):**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Before Deploying

### Checklist
- [ ] Supabase project is created and active
- [ ] Supabase credentials are ready
- [ ] `.env.local` is in `.gitignore` (don't commit credentials)
- [ ] Code is committed to GitHub
- [ ] All tests pass locally (`pnpm build`)
- [ ] Logo image is accessible (`/public/logo.png`)

### Local Testing
```bash
# Test the production build locally
pnpm build
pnpm start

# Visit http://localhost:3000
```

## After Deployment

### Verify Everything Works
1. Visit your live URL
2. Check that recipes load
3. Test search functionality
4. Try filtering recipes
5. Click a recipe to see details
6. Test pagination
7. Check dark mode toggle
8. Test on mobile devices

### Monitor Performance
- Check Vercel/Netlify dashboard for performance metrics
- Monitor database queries in Supabase dashboard
- Set up error tracking if needed

### Set Up Custom Domain (Optional)
1. In Vercel/Netlify settings, go to "Domains"
2. Add your custom domain
3. Update DNS records according to instructions
4. Wait for propagation (can take up to 24 hours)

## Troubleshooting Deployment

### Build Fails with "Cannot find module"
```bash
# Ensure all dependencies are installed
pnpm install

# Rebuild
pnpm build
```

### Recipes not loading after deployment
1. Check that environment variables are set correctly in hosting platform
2. Verify Supabase project URL and key are correct
3. Check browser console for error messages
4. Verify database table exists in Supabase

### Styling looks broken
1. Clear browser cache and hard refresh (Ctrl+Shift+R)
2. Check that Tailwind CSS is being built correctly
3. Verify globals.css is imported in layout.tsx

### Database table missing
1. Log into Supabase dashboard
2. Check SQL Editor for errors when creating table
3. Manually run the SQL from `scripts/001_create_recipes.sql` if needed
4. Verify table appears in Tables section

## Performance Tips

### Optimize Database Queries
- Indexes are already set up on cuisine, rating, and time
- Pagination limits results to 10 per page
- Search is debounced to reduce queries

### Image Optimization
- Logo is already optimized as PNG
- Next.js Image component is used for serving

### Content Delivery
- Vercel/Netlify automatically cache and serve from CDN
- No additional configuration needed

## Monitoring & Maintenance

### Set Up Alerts
1. **Vercel**: Enable email alerts for failed deployments
2. **Supabase**: Monitor database performance in dashboard
3. **Uptime**: Use services like UptimeRobot to monitor availability

### Regular Maintenance
- Monitor error logs in browser console (development)
- Check Supabase API logs for errors
- Update dependencies periodically with `pnpm update`
- Backup database regularly (Supabase has automated backups)

### Scaling
- Current setup handles thousands of users
- If traffic increases significantly:
  1. Consider database replication
  2. Enable caching on frequently accessed data
  3. Use Vercel's edge functions for optimization
  4. Consider CDN for assets

## Security Checklist

- [ ] Use HTTPS (automatic with Vercel/Netlify)
- [ ] Keep dependencies updated (`pnpm update`)
- [ ] Monitor Supabase logs for suspicious activity
- [ ] Use environment variables for all secrets
- [ ] Don't commit `.env.local` to git
- [ ] Regularly review access logs
- [ ] Set up RLS policies if adding authentication later

## Success!

Your Cuisine Share app is now live! Share the URL with friends and start discovering recipes together.

For ongoing support and updates, refer to:
- [README.md](./README.md) - Project overview
- [SETUP.md](./SETUP.md) - Detailed setup guide
- [IMPLEMENTATION.md](./IMPLEMENTATION.md) - Technical details
