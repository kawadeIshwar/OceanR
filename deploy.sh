#!/bin/bash

# OceanR Production Deployment Script
# This script automates the deployment process for production

set -e  # Exit on any error

echo "🚀 Starting OceanR Production Deployment..."

# Configuration
APP_DIR="/home/user/OCEANR"  # Update this path to your actual project directory
BACKUP_DIR="/home/backups/oceanr"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

echo "📦 Creating backup..."
# Backup current .env files
if [ -f "$APP_DIR/server/.env" ]; then
    cp $APP_DIR/server/.env $BACKUP_DIR/.env.backup.$DATE
fi

if [ -f "$APP_DIR/client/.env.production" ]; then
    cp $APP_DIR/client/.env.production $BACKUP_DIR/.env.production.backup.$DATE
fi

echo "📥 Pulling latest changes..."
cd $APP_DIR
git pull origin main

echo "📦 Installing dependencies..."
# Install backend dependencies
cd server
npm install --production

echo "🏗️ Building frontend..."
cd ../client
npm install
npm run build

echo "🔧 Setting up environment..."
# Ensure .env files exist
if [ ! -f "$APP_DIR/server/.env" ]; then
    echo "⚠️  Server .env file not found. Please create it from the template."
    exit 1
fi

if [ ! -f "$APP_DIR/client/.env.production" ]; then
    echo "⚠️  Client .env.production file not found. Please create it from the template."
    exit 1
fi

echo "🔄 Restarting application..."
cd ../server
pm2 restart oceanr-server

echo "✅ Verifying deployment..."
sleep 5

# Check if server is running
if pm2 describe oceanr-server > /dev/null 2>&1; then
    echo "✅ PM2 process is running"
else
    echo "❌ PM2 process failed to start"
    exit 1
fi

# Check if server is responding
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Server is responding to health checks"
else
    echo "❌ Server is not responding to health checks"
    exit 1
fi

echo "🎉 Deployment completed successfully!"
echo "📊 Application status:"
pm2 status

echo "📝 Recent logs:"
pm2 logs oceanr-server --lines 10
