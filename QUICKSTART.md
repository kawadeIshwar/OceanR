# OceanR Enterprises - Quick Start Guide

Get your OceanR website up and running in 10 minutes!

## ⚡ Prerequisites

- Node.js 16+ installed
- MongoDB Atlas account (free tier)
- Cloudinary account (free tier)

## 🚀 Quick Setup

### Step 1: Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2: Configure Environment

Create `server/.env` file:

```env
# Copy from server/.env.example and fill in your values
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/oceanr
JWT_SECRET=your_random_secret_key_min_32_chars
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string from "Connect" button

**Get Cloudinary Credentials:**
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free
3. Copy credentials from dashboard

### Step 3: Seed Database

```bash
cd server
npm run seed
```

This creates:
- Admin user: `admin@oceanr.com` / `ChangeMe123`
- 8 product categories
- 6 sample products

### Step 4: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
✅ Server running on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
✅ Website running on http://localhost:3000

## 🎉 You're Ready!

### Access the Website
- **Public Site:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin/login
  - Email: `admin@oceanr.com`
  - Password: `ChangeMe123`

### First Steps

1. **Login to Admin Panel**
   - Change default password immediately
   - Explore the dashboard

2. **Add Your Products**
   - Go to Products → Add Product
   - Upload images and datasheets
   - Fill in product details

3. **Customize Categories**
   - Go to Categories
   - Edit or add new categories

4. **Test Quote Requests**
   - Visit a product page
   - Submit a quote request
   - Check Admin Panel → Quote Requests

## 📝 Common Commands

```bash
# Start development
npm run dev          # Backend (in server/)
npm run dev          # Frontend (in client/)

# Build for production
npm run build        # Frontend only

# Seed database
npm run seed         # Backend

# Start production
npm start            # Backend
```

## 🔧 Troubleshooting

### Can't connect to MongoDB?
- Check your IP is whitelisted in MongoDB Atlas
- Verify connection string in `.env`
- Try using `0.0.0.0/0` for development

### Cloudinary uploads failing?
- Verify credentials in `.env`
- Check file size (max 10MB for free tier)
- Ensure correct file types (images: jpg/png, datasheet: pdf)

### Port already in use?
- Change `PORT` in `server/.env`
- Change port in `client/vite.config.js`

### Admin login not working?
- Run seed script again: `npm run seed`
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`

## 📚 Next Steps

- Read [README.md](README.md) for full documentation
- Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment

## 🆘 Need Help?

- Check the full README for detailed setup
- Review error logs in terminal
- Verify all environment variables are set
- Ensure MongoDB and Cloudinary are properly configured

---

**Happy Building! 🚀**
