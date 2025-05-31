# JAY Real Estate - Netlify Deployment Guide

This guide will help you deploy the JAY Real Estate website to Netlify.

## 🚀 Quick Deployment Steps

### Option 1: Deploy from GitHub (Recommended)

1. **Login to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up or log in with your GitHub account

2. **Create New Site**
   - Click "New site from Git"
   - Choose "GitHub" as your Git provider
   - Select the `CorporateGuuu/JayRealestate` repository

3. **Configure Build Settings**
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18` (set in Environment variables)

4. **Environment Variables** (Optional)
   - Go to Site settings > Environment variables
   - Add any custom environment variables if needed:
     ```
     NODE_VERSION=18
     NEXT_SERVERLESS=true
     ```

5. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site
   - Your site will be available at a random Netlify URL

### Option 2: Manual Deploy

1. **Build the project locally**:
   ```bash
   npm run build
   ```

2. **Upload the `.next` folder** to Netlify via drag-and-drop

## 🔧 Configuration Details

### Build Settings
The `netlify.toml` file in the root directory contains all necessary configuration:

```toml
[build]
  publish = ".next"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
```

### Custom Domain Setup

1. **Add Custom Domain**
   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Enter your domain (e.g., `jayrealestate.com`)

2. **Configure DNS**
   - Point your domain's DNS to Netlify:
     - For apex domain: Create A record pointing to `75.2.60.5`
     - For www subdomain: Create CNAME record pointing to your Netlify URL

3. **SSL Certificate**
   - Netlify automatically provides free SSL certificates
   - Certificate will be provisioned within a few minutes

## 🔒 Security Headers

The site includes security headers configured in `netlify.toml`:
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## 📊 Performance Optimization

The site is optimized for performance with:
- **Static Generation**: All pages are pre-rendered
- **Image Optimization**: Next.js automatic image optimization
- **Caching Headers**: Optimized cache control for static assets
- **Compression**: Automatic Gzip compression by Netlify

## 🔄 Continuous Deployment

Once connected to GitHub:
- Every push to the `main` branch triggers automatic deployment
- Pull requests create deploy previews
- Build status is shown in GitHub commits

## 📱 Testing

After deployment, test the following:
1. **Homepage**: Hero section, animations, property listings
2. **Navigation**: All menu items and mobile menu
3. **Properties Page**: Search, filters, property cards
4. **About Page**: Team section, company information
5. **Services Page**: Service details and process
6. **Contact Page**: Contact forms (note: forms need backend integration)
7. **Mobile Responsiveness**: Test on various screen sizes

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Images Not Loading**
   - Verify image URLs are accessible
   - Check Next.js image configuration in `next.config.ts`

3. **404 Errors**
   - Ensure `netlify.toml` redirects are configured
   - Check that all pages are properly exported

4. **Slow Loading**
   - Enable Netlify's asset optimization
   - Check image sizes and formats
   - Verify caching headers

### Build Logs
If deployment fails, check the build logs in Netlify dashboard:
- Go to Deploys tab
- Click on the failed deploy
- Review the build log for errors

## 📞 Support

For deployment issues:
1. Check Netlify documentation: [docs.netlify.com](https://docs.netlify.com)
2. Review build logs in Netlify dashboard
3. Check GitHub repository for any recent changes
4. Contact support if needed

## 🎯 Post-Deployment Checklist

- [ ] Site loads correctly at Netlify URL
- [ ] All pages are accessible
- [ ] Images load properly
- [ ] Mobile responsiveness works
- [ ] Contact forms are functional (if backend is configured)
- [ ] Custom domain is configured (if applicable)
- [ ] SSL certificate is active
- [ ] Analytics are set up (if applicable)

---

Your JAY Real Estate website is now ready for production! 🎉
