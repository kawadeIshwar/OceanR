# Production Debugging Guide

## Quick Debugging Steps for Product Creation Issues

### 1. Check Server Status
```bash
# Check if PM2 process is running
pm2 status

# Check server logs
pm2 logs oceanr-server --lines 50

# Check if server is responding
curl -X GET http://localhost:5000/api/health
```

### 2. Environment Verification
```bash
# Check current environment variables
pm2 env 0

# Verify specific variables
pm2 env 0 | grep -E "(MONGODB_URI|NODE_ENV|CLOUDINARY)"
```

### 3. Database Connection Test
```bash
# Test MongoDB connection from server
cd server
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test')
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));
"
```

### 4. Cloudinary Configuration Test
```bash
# Test Cloudinary connection
node -e "
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
cloudinary.api.ping()
.then(() => console.log('Cloudinary connected successfully'))
.catch(err => console.error('Cloudinary connection error:', err));
"
```

### 5. Frontend API Connection Test
```bash
# Test API endpoint from server
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"Test Product","category":"YOUR_CATEGORY_ID"}'
```

### 6. Check Network Connectivity
```bash
# Test internet connectivity
ping google.com

# Test MongoDB Atlas connectivity
ping cluster.mongodb.net

# Test Cloudinary connectivity
ping api.cloudinary.com
```

### 7. Port and Firewall Check
```bash
# Check if port 5000 is listening
sudo netstat -tlnp | grep :5000

# Check firewall rules
sudo ufw status

# Check if port is open from external
telnet your-domain.com 5000
```

### 8. File Permissions Check
```bash
# Check server directory permissions
ls -la server/

# Check logs directory permissions
ls -la server/logs/

# Create logs directory if missing
mkdir -p server/logs
chmod 755 server/logs
```

### 9. Memory and Disk Space
```bash
# Check memory usage
free -h

# Check disk space
df -h

# Check PM2 memory usage
pm2 monit
```

### 10. Nginx Configuration (if using)
```bash
# Test Nginx configuration
sudo nginx -t

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Restart Nginx if needed
sudo systemctl restart nginx
```

## Common Error Scenarios and Solutions

### Scenario 1: "Cannot POST /api/products"
**Possible Causes:**
- Server not running
- Route not properly configured
- PM2 process crashed

**Solutions:**
1. Check PM2 status: `pm2 status`
2. Restart server: `pm2 restart oceanr-server`
3. Check server logs: `pm2 logs oceanr-server`

### Scenario 2: "CORS policy error"
**Possible Causes:**
- Frontend domain not in CORS whitelist
- Environment variables not properly set

**Solutions:**
1. Check `.env` file for `FRONTEND_URL` and `PRODUCTION_FRONTEND_URL`
2. Restart server after updating environment variables
3. Verify frontend domain matches exactly

### Scenario 3: "MongoDB connection failed"
**Possible Causes:**
- IP not whitelisted in MongoDB Atlas
- Connection string incorrect
- Network connectivity issues

**Solutions:**
1. Add VPS IP to MongoDB Atlas whitelist
2. Verify connection string format
3. Test connection from VPS: `mongo "your-connection-string"`

### Scenario 4: "Cloudinary upload failed"
**Possible Causes:**
- Invalid Cloudinary credentials
- File size exceeds limits
- Network connectivity issues

**Solutions:**
1. Verify Cloudinary API keys in `.env`
2. Check file size limits (default 10MB)
3. Test Cloudinary connection manually

### Scenario 5: "Request timeout"
**Possible Causes:**
- Slow internet connection
- Large file upload
- Server overload

**Solutions:**
1. Increase timeout in frontend axios configuration
2. Optimize images before upload
3. Check server resources: `pm2 monit`

## Debugging Product Creation Step-by-Step

### Step 1: Verify Frontend Request
Open browser developer tools and check:
1. Network tab for failed requests
2. Console for JavaScript errors
3. Request payload and headers

### Step 2: Check Backend Logs
```bash
# Follow logs in real-time
pm2 logs oceanr-server --lines 0

# Look for "PRODUCT CREATION START" message
# Check for any error messages
```

### Step 3: Test API Manually
```bash
# Create a test product without images
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -d '{
    "name": "Test Product",
    "description": "Test Description",
    "category": "YOUR_CATEGORY_ID",
    "featured": false,
    "specs": {}
  }'
```

### Step 4: Test with Images
```bash
# Test with a small image file
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -F "data={\"name\":\"Test Product\",\"category\":\"YOUR_CATEGORY_ID\"}" \
  -F "images=@/path/to/small-test-image.jpg"
```

## Performance Monitoring

### Real-time Monitoring
```bash
# PM2 monitoring
pm2 monit

# System resource usage
htop

# Network connections
sudo netstat -i
```

### Log Analysis
```bash
# Error patterns
pm2 logs oceanr-server | grep -i error

# Product creation attempts
pm2 logs oceanr-server | grep "PRODUCT CREATION"

# Database operations
pm2 logs oceanr-server | grep -i mongodb
```

## Emergency Recovery Steps

### If Server Crashes
```bash
# Restart PM2 process
pm2 restart oceanr-server

# If restart fails, kill and start fresh
pm2 delete oceanr-server
pm2 start ecosystem.config.json --env production
```

### If Database Connection Fails
```bash
# Check MongoDB Atlas status
# Verify IP whitelist
# Test connection string
# Restart server after fixing
```

### If File Uploads Fail
```bash
# Check Cloudinary status
# Verify API keys
# Check file permissions
# Test with small files first
```

## Contact Support

If issues persist after following these steps:

1. Collect relevant logs: `pm2 logs oceanr-server > debug.log`
2. Document exact error messages
3. List steps already attempted
4. Provide environment details (Node.js version, PM2 version, etc.)
