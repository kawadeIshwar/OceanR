@echo off
echo Creating .env file template...

(
echo # MongoDB - REQUIRED: Get from MongoDB Atlas
echo MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/oceanr?retryWrites=true^&w=majority
echo.
echo # JWT - REQUIRED
echo JWT_SECRET=oceanr_super_secret_key_change_this_in_production_min_32_characters
echo JWT_EXPIRES_IN=7d
echo.
echo # Server
echo PORT=5000
echo NODE_ENV=development
echo.
echo # Cloudinary - Optional for now, required for image uploads
echo CLOUDINARY_CLOUD_NAME=demo
echo CLOUDINARY_API_KEY=123456789
echo CLOUDINARY_API_SECRET=demo_secret
echo.
echo # Email - Optional
echo EMAIL_HOST=smtp.gmail.com
echo EMAIL_PORT=587
echo EMAIL_USER=your_email@gmail.com
echo EMAIL_PASS=your_app_password
echo EMAIL_FROM=oceanrenterprises@gmail.com
) > server\.env

echo.
echo ✓ Created server\.env file
echo.
echo IMPORTANT: Edit server\.env and add your MongoDB URI!
echo.
echo 1. Go to https://www.mongodb.com/cloud/atlas
echo 2. Create a free cluster
echo 3. Get connection string
echo 4. Replace the MONGODB_URI in server\.env
echo.
pause
