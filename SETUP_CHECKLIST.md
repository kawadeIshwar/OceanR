# OceanR Enterprises - Setup Checklist

Use this checklist to ensure your OceanR website is properly set up and ready to go.

## ✅ Initial Setup

### Prerequisites
- [ ] Node.js 16+ installed
- [ ] npm or yarn installed
- [ ] Git installed (optional)
- [ ] Code editor (VS Code recommended)

### Accounts Created
- [ ] MongoDB Atlas account created
- [ ] Cloudinary account created
- [ ] Gmail account for email notifications (optional)

## 📦 Installation

### Dependencies
- [ ] Server dependencies installed (`cd server && npm install`)
- [ ] Client dependencies installed (`cd client && npm install`)
- [ ] Root dependencies installed (`npm install` - for concurrently)

### Configuration Files
- [ ] `server/.env` file created
- [ ] MongoDB URI added to `.env`
- [ ] JWT_SECRET generated and added
- [ ] Cloudinary credentials added
- [ ] Email settings configured (optional)

## 🗄️ Database Setup

### MongoDB Atlas
- [ ] Cluster created
- [ ] Database user created
- [ ] IP address whitelisted (0.0.0.0/0 for dev)
- [ ] Connection string obtained
- [ ] Connection string tested

### Database Seeding
- [ ] Seed script executed (`npm run seed`)
- [ ] Admin user created successfully
- [ ] Categories created (8 total)
- [ ] Sample products created (6 total)
- [ ] Database connection verified

## ☁️ Cloudinary Setup

- [ ] Account created and verified
- [ ] Cloud name copied
- [ ] API key copied
- [ ] API secret copied
- [ ] Credentials added to `.env`
- [ ] Upload folders created (optional)

## 🚀 Development Environment

### Backend Server
- [ ] Server starts without errors (`npm run dev`)
- [ ] Runs on port 5000
- [ ] MongoDB connection successful
- [ ] API health check works (`http://localhost:5000/api/health`)

### Frontend Application
- [ ] Client starts without errors (`npm run dev`)
- [ ] Runs on port 3000
- [ ] Tailwind CSS loads correctly
- [ ] No console errors

### Both Servers
- [ ] Can run both with `npm run dev` from root
- [ ] API proxy working (frontend → backend)
- [ ] CORS configured correctly

## 🧪 Testing

### Public Website
- [ ] Home page loads
- [ ] Products page displays products
- [ ] Product detail page works
- [ ] Category pages work
- [ ] About page displays correctly
- [ ] Contact page loads
- [ ] Navigation menu works
- [ ] Footer displays correctly
- [ ] Responsive on mobile
- [ ] Responsive on tablet

### Forms
- [ ] Quote request form submits
- [ ] Contact form submits
- [ ] Form validation works
- [ ] Success messages display
- [ ] Error messages display

### Admin Panel
- [ ] Admin login page loads
- [ ] Can login with default credentials
  - Email: `admin@oceanr.com`
  - Password: `ChangeMe123`
- [ ] Dashboard displays statistics
- [ ] Products page loads
- [ ] Can create new product
- [ ] Can edit existing product
- [ ] Can delete product
- [ ] Categories page loads
- [ ] Can create new category
- [ ] Can edit category
- [ ] Can delete category
- [ ] Quotes page loads
- [ ] Can view quote requests
- [ ] Can update quote status
- [ ] Can delete quotes
- [ ] Logout works

### File Uploads
- [ ] Product images upload to Cloudinary
- [ ] Multiple images can be uploaded
- [ ] PDF datasheets upload successfully
- [ ] Uploaded files display correctly
- [ ] Image URLs are saved in database

### API Endpoints
- [ ] GET `/api/products` works
- [ ] GET `/api/products/:id` works
- [ ] POST `/api/products` works (with auth)
- [ ] PUT `/api/products/:id` works (with auth)
- [ ] DELETE `/api/products/:id` works (with auth)
- [ ] GET `/api/categories` works
- [ ] POST `/api/categories` works (with auth)
- [ ] GET `/api/quotes` works (with auth)
- [ ] POST `/api/quotes` works (public)
- [ ] GET `/api/admin/stats` works (with auth)

## 🔐 Security

### Authentication
- [ ] JWT tokens generated correctly
- [ ] Tokens stored in localStorage
- [ ] Protected routes require authentication
- [ ] Unauthorized access blocked
- [ ] Token expiration works

### Passwords
- [ ] Admin password hashed in database
- [ ] Default password changed
- [ ] Password comparison works on login

### Validation
- [ ] Required fields validated
- [ ] Email format validated
- [ ] Invalid data rejected
- [ ] Error messages clear

## 📧 Email Configuration (Optional)

- [ ] Email host configured
- [ ] Email credentials added
- [ ] Test email sent successfully
- [ ] Quote notifications working

## 🎨 UI/UX

### Design
- [ ] Brand colors applied correctly
- [ ] Fonts loaded (Inter, Poppins)
- [ ] Icons display correctly
- [ ] Images have proper alt text
- [ ] Buttons have hover states
- [ ] Links are accessible

### Responsiveness
- [ ] Mobile view (< 640px) works
- [ ] Tablet view (640-1024px) works
- [ ] Desktop view (> 1024px) works
- [ ] Navigation menu responsive
- [ ] Forms responsive
- [ ] Images responsive

## 📝 Documentation

- [ ] README.md reviewed
- [ ] QUICKSTART.md reviewed
- [ ] API_DOCUMENTATION.md available
- [ ] DEPLOYMENT.md available
- [ ] All documentation up to date

## 🚀 Pre-Deployment

### Code Quality
- [ ] No console errors
- [ ] No console warnings
- [ ] Code formatted consistently
- [ ] Comments added where needed
- [ ] Unused code removed

### Environment Variables
- [ ] All required variables set
- [ ] No hardcoded secrets
- [ ] `.env` in `.gitignore`
- [ ] `.env.example` updated

### Git Repository
- [ ] Repository initialized
- [ ] `.gitignore` configured
- [ ] Initial commit made
- [ ] Remote repository added (optional)

## 🌐 Production Deployment

### Backend (Render/Railway)
- [ ] Service created
- [ ] Environment variables set
- [ ] Build successful
- [ ] Deployment successful
- [ ] API accessible
- [ ] Database connected

### Frontend (Vercel/Netlify)
- [ ] Project created
- [ ] Environment variables set
- [ ] Build successful
- [ ] Deployment successful
- [ ] Site accessible
- [ ] API connection works

### Post-Deployment
- [ ] Database seeded in production
- [ ] Admin login works
- [ ] Default password changed
- [ ] Test all features
- [ ] Monitor for errors
- [ ] Set up backups

## 📊 Final Verification

### Functionality
- [ ] All pages accessible
- [ ] All forms working
- [ ] All API endpoints responding
- [ ] File uploads working
- [ ] Authentication working
- [ ] Admin panel functional

### Performance
- [ ] Pages load quickly
- [ ] Images optimized
- [ ] No memory leaks
- [ ] Database queries efficient

### Security
- [ ] HTTPS enabled (production)
- [ ] Passwords secure
- [ ] API protected
- [ ] CORS configured
- [ ] No sensitive data exposed

## 🎉 Launch Ready!

When all items are checked:
- [ ] Website is fully functional
- [ ] All features tested
- [ ] Documentation complete
- [ ] Security measures in place
- [ ] Ready for production use

---

## 🆘 Troubleshooting Reference

If you encounter issues, check:

1. **Server won't start**
   - Verify `.env` file exists
   - Check MongoDB connection string
   - Ensure port 5000 is available

2. **Client won't start**
   - Run `npm install` in client folder
   - Check for port conflicts
   - Clear node_modules and reinstall

3. **Database connection fails**
   - Verify MongoDB URI
   - Check IP whitelist
   - Test connection string

4. **Uploads fail**
   - Verify Cloudinary credentials
   - Check file size limits
   - Ensure correct file types

5. **Authentication issues**
   - Check JWT_SECRET is set
   - Verify token in localStorage
   - Try clearing browser data

---

**Setup Date:** _______________  
**Completed By:** _______________  
**Notes:** _______________
