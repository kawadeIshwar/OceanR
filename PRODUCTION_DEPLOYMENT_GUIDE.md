# OceanR MERN Stack Production Deployment Guide

## Overview
This guide provides step-by-step instructions for deploying the OceanR MERN stack application to a Hostinger VPS with proper environment-based configuration.

## Prerequisites
- Hostinger VPS with Ubuntu/Debian
- Domain name pointed to VPS IP
- Node.js 18+ installed
- PM2 installed globally
- Nginx installed (optional but recommended)
- MongoDB Atlas cluster
- Cloudinary account

## Environment Configuration

### Backend Environment Variables

#### Development (.env.development)
```bash
# Copy the development template
cp server/.env.development server/.env

# Update these values:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/oceanr?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_key_change_this_min_32_chars
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### Production (.env)
```bash
# Copy the production template
cp server/env.production.example server/.env

# Update these values:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/oceanr?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_key_change_this_min_32_chars
BASE_URL=https://your-domain.com
FRONTEND_URL=https://your-domain.com
PRODUCTION_FRONTEND_URL=https://your-domain.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Frontend Environment Variables

#### Development (.env.development)
```bash
# Copy the development template
cp client/.env.development client/.env

# Update EmailJS values:
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

#### Production (.env.production)
```bash
# Copy the production template
cp client/env.production.example client/.env.production

# Update these values:
VITE_API_URL=https://your-domain.com/api
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Deployment Steps

### 1. Server Setup
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx (optional)
sudo apt update
sudo apt install nginx
```

### 2. Clone and Build
```bash
# Clone your repository
git clone https://github.com/your-username/OCEANR.git
cd OCEANR

# Install backend dependencies
cd server
npm install

# Install frontend dependencies and build
cd ../client
npm install
npm run build

# Go back to server directory
cd ../server
```

### 3. Environment Setup
```bash
# Create production environment file
cp env.production.example .env

# Edit the .env file with your actual values
nano .env
```

### 4. Start with PM2
```bash
# Start the application
pm2 start ecosystem.config.json --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
```

### 5. Nginx Configuration (Optional)
Create `/etc/nginx/sites-available/oceanr`:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend static files
    location / {
        root /path/to/OCEANR/client/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/oceanr /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Update Deployment Process

### When pushing updates:
```bash
# Pull latest changes
git pull origin main

# Install new dependencies (if any)
npm install
cd ../client && npm install && cd ../server

# Rebuild frontend
cd ../client
npm run build

# Restart backend
cd ../server
pm2 restart oceanr-server
```

## Security Considerations

### MongoDB Atlas
1. Go to MongoDB Atlas dashboard
2. Network Access → Add IP Address
3. Add your VPS IP address
4. Ensure database user has appropriate permissions

### Environment Variables
- Never commit `.env` files to Git
- Use strong, unique secrets
- Rotate JWT secrets regularly
- Use app passwords for email (not regular passwords)

### SSL/HTTPS
1. Install Certbot: `sudo apt install certbot python3-certbot-nginx`
2. Get certificate: `sudo certbot --nginx -d your-domain.com -d www.your-domain.com`
3. Auto-renewal: `sudo crontab -e` and add: `0 12 * * * /usr/bin/certbot renew --quiet`

## Monitoring and Logs

### PM2 Commands
```bash
# View running processes
pm2 status

# View logs
pm2 logs oceanr-server

# Monitor
pm2 monit

# Restart
pm2 restart oceanr-server

# Stop
pm2 stop oceanr-server
```

### Log Files
- PM2 logs: `~/OCEANR/server/logs/`
- Nginx logs: `/var/log/nginx/`
- Application logs: Check PM2 logs for detailed error information

## Troubleshooting Common Issues

### Product Creation Not Working

1. **Check Environment Variables**
   ```bash
   pm2 env 0
   # Verify all required variables are set
   ```

2. **Check MongoDB Connection**
   ```bash
   # Test connection from VPS
   mongo "mongodb+srv://username:password@cluster.mongodb.net/oceanr"
   ```

3. **Check Cloudinary Configuration**
   - Verify API keys are correct
   - Check folder permissions
   - Review upload limits

4. **Check CORS Issues**
   - Verify frontend URL is in allowed origins
   - Check browser console for CORS errors

5. **Check File Upload Limits**
   ```bash
   # Check Nginx client_max_body_size (if using Nginx)
   sudo nano /etc/nginx/nginx.conf
   # Add: client_max_body_size 10M;
   ```

### Database Connection Issues
1. Verify MongoDB Atlas IP whitelist includes VPS IP
2. Check database user credentials
3. Ensure network connectivity from VPS to MongoDB Atlas

### API Not Responding
1. Check if PM2 process is running: `pm2 status`
2. Check port conflicts: `sudo netstat -tlnp | grep :5000`
3. Review application logs: `pm2 logs oceanr-server`

## Performance Optimization

### PM2 Configuration
- Cluster mode is enabled for better performance
- Memory limit set to 1GB
- Auto-restart on crashes

### Nginx Optimization
- Gzip compression enabled
- Static file caching
- Proper headers for SPA routing

### Database Optimization
- Use MongoDB Atlas M0+ cluster for production
- Create proper indexes on frequently queried fields
- Monitor query performance

## Backup Strategy

### Database Backup
- Enable MongoDB Atlas automated backups
- Export regular backups: `mongodump --uri="your-connection-string"`

### Code Backup
- Git repository serves as code backup
- Tag releases for easy rollback

### Environment Backup
- Keep secure backup of `.env` files
- Document all third-party service configurations
