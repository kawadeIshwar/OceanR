# OceanR Enterprises - MERN Stack Website

A professional full-stack web application for OceanR Enterprises, built with MongoDB, Express.js, React, and Node.js.

## 🚀 Features

### Public Website
- **Modern Hero Section** with gradient background and infinite product carousel
- **Product Catalog** with search, filtering, and category browsing
- **Product Detail Pages** with image galleries, specifications, and datasheet downloads
- **Quote Request System** for customer inquiries
- **Responsive Design** optimized for all devices
- **Contact Page** with business information and contact form

### Admin Panel
- **Secure Authentication** with JWT tokens
- **Dashboard** with statistics and quick actions
- **Product Management** - Create, edit, delete products with image/PDF uploads
- **Category Management** - Organize products into categories
- **Quote Management** - View and manage customer quote requests
- **Cloudinary Integration** for media storage

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image/file uploads)
- npm or yarn package manager

## 🛠️ Installation

### 1. Clone the Repository

```bash
cd OCEANR
```

### 2. Server Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/oceanr?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_secure_jwt_secret_key_change_this
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Optional - for quote notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=oceanrenterprises@gmail.com
```

### 3. Client Setup

```bash
cd ../client
npm install
```

### 4. Seed Database

Run the seed script to populate initial data:

```bash
cd ../server
npm run seed
```

This will create:
- Default admin user (email: `admin@oceanr.com`, password: `ChangeMe123`)
- 8 product categories
- 6 sample products

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
Client runs on `http://localhost:3000`

### Production Build

**Build Frontend:**
```bash
cd client
npm run build
```

**Start Backend:**
```bash
cd server
npm start
```

## 📱 Usage

### Public Website
- Visit `http://localhost:3000`
- Browse products, categories, and company information
- Submit quote requests through product pages or contact form

### Admin Panel
- Visit `http://localhost:3000/admin/login`
- Login with credentials:
  - Email: `admin@oceanr.com`
  - Password: `ChangeMe123`
- **⚠️ Important:** Change the default password after first login

## 🗂️ Project Structure

```
OCEANR/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── admin/     # Admin-specific components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/       # React Context (Auth)
│   │   ├── pages/         # Page components
│   │   │   ├── admin/     # Admin pages
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── CategoryPage.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   ├── utils/         # Utilities (API client)
│   │   ├── App.jsx        # Main app with routing
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                # Node.js Backend
│   ├── config/           # Configuration files
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── middleware/       # Express middleware
│   │   ├── auth.js       # JWT authentication
│   │   └── validation.js # Request validation
│   ├── models/           # Mongoose models
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── QuoteRequest.js
│   │   └── AdminUser.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── quotes.js
│   │   └── admin.js
│   ├── server.js         # Express app
│   ├── seed.js           # Database seeding
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 🔐 API Endpoints

### Public Endpoints
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/quotes` - Submit quote request

### Protected Endpoints (Require JWT)
- `POST /api/auth/login` - Admin login
- `GET /api/admin/stats` - Dashboard statistics
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category
- `GET /api/quotes` - Get all quotes
- `PUT /api/quotes/:id` - Update quote status
- `DELETE /api/quotes/:id` - Delete quote

## 🎨 Design & Branding

### Color Palette
- **Primary Blue:** `#0077e6` (Ocean blue from logo)
- **Light Blue:** `#4da9ff`
- **Dark Blue:** `#004380`
- **Accent:** Black for headings, white for backgrounds

### Typography
- **Fonts:** Inter, Poppins (Google Fonts)
- **Headings:** Bold/Black weight
- **Body:** Regular weight

### UI Components
- Tailwind CSS utility classes
- Responsive grid layouts
- Smooth transitions and hover effects
- Accessible forms with proper labels

## 🔧 Configuration

### MongoDB Atlas Setup
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist your IP address (or use 0.0.0.0/0 for development)
4. Get connection string and add to `.env`

### Cloudinary Setup
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret from dashboard
3. Add credentials to `.env`

### Email Configuration (Optional)
For Gmail:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use App Password in `.env` as `EMAIL_PASS`

## 📦 Deployment

### Backend (Render/Railway)
1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && npm start`
5. Add environment variables from `.env`

### Frontend (Vercel/Netlify)
1. Create new project
2. Set root directory: `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL=your-backend-url`

## 🔒 Security

- JWT tokens for authentication
- Password hashing with bcrypt
- Input validation with Joi
- CORS configuration
- Environment variables for sensitive data
- Protected admin routes

## 📞 Contact Information

**OceanR Enterprises**
- **Contact Person:** MR. Aryan Bhosale
- **Phone:** +91 9766652205
- **Email:** oceanrenterprises@gmail.com
- **GSTIN:** 27AABFO9331N1ZC
- **Location:** Pune, Maharashtra, India

## 🤝 Contributing

This is a proprietary project for OceanR Enterprises. For any modifications or support, please contact the development team.

## 📄 License

Copyright © 2025 OceanR Enterprises. All rights reserved.

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Check MongoDB URI in `.env`
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

**Cloudinary Upload Error:**
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper file types (images: jpg, png; datasheet: pdf)

**JWT Authentication Error:**
- Clear browser localStorage
- Check JWT_SECRET in `.env`
- Verify token hasn't expired

**Port Already in Use:**
- Change PORT in `.env` (backend)
- Change port in `vite.config.js` (frontend)

## 📚 Technologies Used

### Frontend
- React 19
- Vite
- React Router v6
- Tailwind CSS v4
- Axios
- React Hook Form
- Splide (carousel)
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- Bcrypt.js
- Cloudinary
- Multer
- Joi (validation)
- Nodemailer
- CORS

## 🎯 Future Enhancements

- Product reviews and ratings
- Advanced search with filters
- Wishlist functionality
- Order management system
- Invoice generation
- Multi-language support
- Analytics dashboard
- Email templates for quotes
- Bulk product import/export

---

**Built with ❤️ for OceanR Enterprises**
