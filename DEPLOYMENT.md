# OceanR Enterprises - Deployment Guide

This guide provides step-by-step instructions for deploying the OceanR Enterprises website to production.

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Cloudinary account set up with credentials
- [ ] Email service configured (optional)
- [ ] Domain name purchased (optional)
- [ ] SSL certificate ready (handled by hosting platforms)

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Click "Build a Database"
4. Choose "FREE" tier (M0 Sandbox)
5. Select your preferred cloud provider and region
6. Name your cluster (e.g., "oceanr-cluster")
7. Click "Create Cluster"

### 2. Configure Database Access

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and password (save these securely)
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

### 3. Configure Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your server's IP address
5. Click "Confirm"

### 4. Get Connection String

1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `oceanr`

Example:
```
mongodb+srv://username:password@cluster.mongodb.net/oceanr?retryWrites=true&w=majority
```

## ☁️ Cloudinary Setup

### 1. Create Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free account
3. Verify your email

### 2. Get Credentials

1. Go to Dashboard
2. Find "Account Details" section
3. Copy:
   - Cloud Name
   - API Key
   - API Secret

### 3. Configure Upload Presets (Optional)

1. Go to Settings → Upload
2. Create upload preset for products
3. Set folder to "oceanr/products"

## 🚀 Backend Deployment (Render)

### Option 1: Deploy to Render

1. **Create Account**
   - Go to [Render](https://render.com/)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Or use "Public Git repository" with repo URL

3. **Configure Service**
   - Name: `oceanr-api`
   - Region: Choose closest to your users
   - Branch: `main`
   - Root Directory: `server`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables**
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_random_string
   JWT_EXPIRES_IN=7d
   PORT=5000
   NODE_ENV=production
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM=oceanrenterprises@gmail.com
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your API URL (e.g., `https://oceanr-api.onrender.com`)

### Option 2: Deploy to Railway

1. Go to [Railway](https://railway.app/)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables (same as above)
6. Set root directory to `server`
7. Deploy

## 🌐 Frontend Deployment (Vercel)

### 1. Prepare Frontend

Update API URL in `client/src/utils/api.js`:

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  // ... rest of config
});
```

### 2. Deploy to Vercel

1. **Create Account**
   - Go to [Vercel](https://vercel.com/)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Project**
   - Framework Preset: `Vite`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variable**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Alternative: Deploy to Netlify

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up and click "Add new site"
3. Connect GitHub repository
4. Configure:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`
5. Add environment variable: `VITE_API_URL`
6. Deploy

## 🔧 Post-Deployment Setup

### 1. Seed Database

SSH into your backend server or use Render shell:

```bash
npm run seed
```

Or run seed script locally pointing to production database:

```bash
cd server
MONGODB_URI=your_production_uri npm run seed
```

### 2. Test Admin Login

1. Go to `https://your-domain.com/admin/login`
2. Login with:
   - Email: `admin@oceanr.com`
   - Password: `ChangeMe123`
3. **Immediately change the password!**

### 3. Upload Products

1. Go to Admin Panel → Products
2. Add product images and datasheets
3. Verify Cloudinary uploads work

### 4. Test Quote Requests

1. Submit a test quote from public site
2. Check if it appears in Admin Panel
3. Verify email notifications (if configured)

## 🔒 Security Hardening

### 1. Change Default Credentials

```bash
# Connect to MongoDB and update admin password
# Or use Admin Panel to create new admin user
```

### 2. Update Environment Variables

- Generate strong JWT_SECRET: `openssl rand -base64 32`
- Use strong database passwords
- Rotate API keys periodically

### 3. Configure CORS

Update `server/server.js`:

```javascript
app.use(cors({
  origin: ['https://your-domain.com', 'https://www.your-domain.com'],
  credentials: true
}));
```

### 4. Enable Rate Limiting

Install and configure:

```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 🌐 Custom Domain Setup

### Vercel (Frontend)

1. Go to Project Settings → Domains
2. Add your domain (e.g., `oceanr.com`)
3. Follow DNS configuration instructions
4. Add DNS records at your domain registrar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Render (Backend)

1. Go to Service Settings → Custom Domain
2. Add subdomain (e.g., `api.oceanr.com`)
3. Add CNAME record at domain registrar:
   ```
   Type: CNAME
   Name: api
   Value: your-service.onrender.com
   ```

## 📊 Monitoring & Maintenance

### 1. Set Up Monitoring

**Render:**
- Built-in metrics in dashboard
- Set up email alerts for downtime

**Vercel:**
- Analytics available in dashboard
- Configure deployment notifications

### 2. Database Backups

**MongoDB Atlas:**
- Go to Clusters → Backup
- Enable Cloud Backup (paid feature)
- Or export data regularly:
  ```bash
  mongodump --uri="your_connection_string"
  ```

### 3. Log Monitoring

Check application logs regularly:
- Render: View logs in dashboard
- Vercel: Check function logs

### 4. Update Dependencies

Regularly update packages:

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Update major versions carefully
npm install package@latest
```

## 🐛 Troubleshooting

### Build Failures

**Frontend:**
- Check Node.js version compatibility
- Verify all dependencies installed
- Check for TypeScript errors
- Review build logs

**Backend:**
- Verify environment variables set
- Check MongoDB connection
- Review server logs

### Runtime Errors

**500 Internal Server Error:**
- Check server logs
- Verify database connection
- Check environment variables

**CORS Errors:**
- Update CORS configuration
- Verify frontend URL in backend

**Authentication Issues:**
- Check JWT_SECRET matches
- Verify token expiration settings
- Clear browser cache/localStorage

## 📞 Support

For deployment issues:
1. Check service status pages (Render, Vercel, MongoDB Atlas)
2. Review error logs
3. Consult platform documentation
4. Contact platform support if needed

---

**Deployment Checklist:**
- [ ] MongoDB Atlas configured
- [ ] Cloudinary set up
- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] Database seeded
- [ ] Admin credentials changed
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Monitoring set up
- [ ] Backups configured

**Your site is now live! 🎉**
