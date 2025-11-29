# 🚀 Netlify Deployment Guide for OceanR

This guide will help you deploy your OceanR website to Netlify.

---

## 📋 Prerequisites

1. **GitHub Account** ✅ (Already done - your code is at https://github.com/kawadeIshwar/OceanR.git)
2. **Netlify Account** - Sign up at https://www.netlify.com (free tier available)
3. **Backend Hosted** - Your Node.js API needs to be hosted separately (see Backend Deployment section)

---

## 🎯 Quick Deployment Steps

### Option 1: Deploy via Netlify Dashboard (Recommended)

#### Step 1: Sign Up/Login to Netlify
1. Go to https://app.netlify.com
2. Sign up with GitHub (easiest option)
3. Authorize Netlify to access your GitHub repositories

#### Step 2: Import Your Project
1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Authorize Netlify (if not already done)
4. Search for and select **"OceanR"** repository
5. Click on the repository to continue

#### Step 3: Configure Build Settings
Fill in these settings:

**Base directory:**
```
client
```

**Build command:**
```
npm run build
```

**Publish directory:**
```
client/dist
```

**Environment variables:** (Add after backend is deployed)
- Variable: `VITE_API_URL`
- Value: `https://your-backend-url.com/api`
  _(Leave empty for now if backend not ready)_

#### Step 4: Deploy
1. Click **"Deploy site"**
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at a URL like: `https://random-name-12345.netlify.app`

#### Step 5: Custom Domain (Optional)
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow instructions to add your domain (e.g., oceanr.com)

---

### Option 2: Deploy via Netlify CLI

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify
```bash
netlify login
```

#### Step 3: Build Your Project
```bash
cd client
npm install
npm run build
```

#### Step 4: Deploy
```bash
# Test deployment
netlify deploy

# Production deployment
netlify deploy --prod
```

---

## 🔧 Backend Deployment Options

Since Netlify is primarily for frontend hosting, you need to deploy your Node.js backend separately. Here are the best options:

### Option A: Render (Recommended - Free Tier Available)

1. **Sign up:** https://render.com
2. **Create New Web Service:**
   - Connect your GitHub repository
   - Root directory: `server`
   - Build command: `npm install`
   - Start command: `npm start`
3. **Add Environment Variables:**
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret
   - `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
   - `CLOUDINARY_API_KEY` - Cloudinary API key
   - `CLOUDINARY_API_SECRET` - Cloudinary API secret
   - `ADMIN_EMAIL` - Admin email
   - `ADMIN_PASSWORD` - Admin password
   - `PORT` - 5000
   - `NODE_ENV` - production

4. **Copy the URL** (e.g., `https://oceanr-api.onrender.com`)

### Option B: Railway.app (Great for Full-Stack)

1. **Sign up:** https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. Select "server" folder
4. Add environment variables (same as above)
5. Deploy!

### Option C: Heroku (Reliable but Paid)

1. **Sign up:** https://heroku.com
2. Create new app
3. Connect GitHub repository
4. Set buildpack to Node.js
5. Configure environment variables
6. Deploy from GitHub

---

## 🔗 Connecting Frontend to Backend

Once your backend is deployed:

### Step 1: Get Your Backend URL
Example: `https://oceanr-api.onrender.com`

### Step 2: Update Netlify Environment Variable
1. Go to Netlify Dashboard
2. **Site settings** → **Environment variables**
3. Click **"Add a variable"**
4. **Key:** `VITE_API_URL`
5. **Value:** `https://oceanr-api.onrender.com/api` _(Your backend URL + /api)_
6. Click **"Save"**

### Step 3: Redeploy
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for build to complete

---

## 🎨 Netlify Configuration (Already Set Up)

Your project includes `client/netlify.toml` with:
- ✅ Automatic redirects for React Router
- ✅ Security headers
- ✅ Cache optimization for static assets
- ✅ Build configuration

---

## 🔐 Environment Variables Setup

### For Local Development:
1. In `client` folder, create `.env`:
```env
# Leave empty for local development (uses proxy)
VITE_API_URL=
```

### For Production (Netlify):
Set in Netlify Dashboard → Site settings → Environment variables:
```
VITE_API_URL=https://your-backend-url.com/api
```

---

## ✅ Post-Deployment Checklist

### Frontend (Netlify):
- [ ] Site builds successfully
- [ ] Home page loads
- [ ] Products page shows products
- [ ] Navigation works
- [ ] Images load correctly
- [ ] Forms submit properly

### Backend (Render/Railway/Heroku):
- [ ] API is accessible
- [ ] Database connects successfully
- [ ] Admin login works
- [ ] Image uploads work (Cloudinary)
- [ ] CORS is configured correctly

### Integration:
- [ ] Frontend can fetch products from backend
- [ ] Admin panel connects to backend
- [ ] Forms submit to backend
- [ ] Authentication works
- [ ] Image uploads work from frontend

---

## 🐛 Troubleshooting

### Issue: "Failed to fetch" errors
**Solution:** 
- Check if backend URL is correct in Netlify environment variables
- Ensure backend has CORS enabled for your Netlify domain
- Verify backend is running and accessible

### Issue: 404 on page refresh
**Solution:** 
- This should be handled by `netlify.toml`
- If not, add a `_redirects` file in `client/public/`:
```
/*    /index.html   200
```

### Issue: API calls not working
**Solution:**
1. Check browser console for errors
2. Verify `VITE_API_URL` is set correctly in Netlify
3. Check if backend allows CORS from your Netlify domain
4. Ensure backend API routes are correct

### Issue: Images not loading
**Solution:**
- Check Cloudinary configuration in backend
- Verify image URLs in database
- Check browser console for CORS errors

### Issue: Build fails on Netlify
**Solution:**
- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Try clearing cache and rebuilding
- Check for environment variable issues

---

## 🔄 Updating Your Deployed Site

### Automatic Deployments (Recommended):
Netlify watches your GitHub repository:
1. Make changes to your code locally
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Your update message"
git push
```
3. Netlify automatically rebuilds and deploys! 🎉

### Manual Deployment:
1. Go to Netlify Dashboard
2. **Deploys** tab
3. **Trigger deploy** → **Deploy site**

---

## 💰 Cost Breakdown

### Netlify (Frontend):
- **Free Tier:**
  - ✅ 100GB bandwidth/month
  - ✅ Unlimited sites
  - ✅ HTTPS included
  - ✅ Custom domain support
  - ✅ Perfect for most small to medium projects

### Render (Backend - Free Tier):
- ✅ 750 hours/month (enough for 1 service running 24/7)
- ⚠️ Sleeps after 15 minutes of inactivity (wakes up in ~1 minute)
- ✅ Automatic HTTPS
- ✅ Good for development/testing

### Render (Paid - $7/month):
- ✅ No sleep/downtime
- ✅ Better performance
- ✅ Recommended for production

### MongoDB Atlas:
- **Free Tier (M0):**
  - ✅ 512 MB storage
  - ✅ Shared cluster
  - ✅ Good for development/small projects

---

## 🎉 Your Deployment URLs

After deployment, you'll have:

**Frontend (Netlify):**
- Temporary: `https://random-name-12345.netlify.app`
- Custom: `https://oceanr.com` (if you add a domain)

**Backend (Render/Railway):**
- `https://oceanr-api.onrender.com`
- or `https://oceanr-api.up.railway.app`

**Admin Panel:**
- `https://your-site.netlify.app/admin`

---

## 📱 Next Steps After Deployment

1. **Test Everything:**
   - Browse all pages
   - Test admin login
   - Add/edit products
   - Submit contact forms

2. **Setup Monitoring:**
   - Enable Netlify Analytics (optional)
   - Monitor Render/Railway logs
   - Set up uptime monitoring (UptimeRobot - free)

3. **SEO & Performance:**
   - Add meta tags for SEO
   - Submit sitemap to Google
   - Test with Lighthouse
   - Add Google Analytics (optional)

4. **Security:**
   - Enable HTTPS (automatic on Netlify)
   - Use strong admin passwords
   - Keep dependencies updated
   - Regular backups of MongoDB

---

## 🆘 Need Help?

- **Netlify Docs:** https://docs.netlify.com
- **Render Docs:** https://render.com/docs
- **Railway Docs:** https://docs.railway.app

---

## 🎊 Congratulations!

Once deployed, your OceanR website will be:
- ✅ Live and accessible worldwide
- ✅ Automatically deployed on every push
- ✅ Secured with HTTPS
- ✅ Fast and reliable
- ✅ Professional and scalable

**Your website is ready for business! 🚀**
