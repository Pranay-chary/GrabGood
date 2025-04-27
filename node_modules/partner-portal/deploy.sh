#!/bin/bash

# Partner Portal Deployment Script

# Exit on error
set -e

echo "Starting partner-portal deployment..."

# Navigate to partner-portal directory
cd "$(dirname "$0")"

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

# Ensure the deployment directory exists on the server
echo "Preparing deployment directory..."
ssh user@server "mkdir -p /var/www/partner-portal"

# Copy the build files to the server
echo "Deploying build files..."
scp -r dist/* user@server:/var/www/partner-portal/

# Copy Nginx configuration if it doesn't exist
echo "Setting up Nginx configuration..."
ssh user@server "if [ ! -f /etc/nginx/sites-available/partner-portal ]; then sudo cp /dev/null /etc/nginx/sites-available/partner-portal; fi"
scp nginx.conf user@server:/tmp/partner-portal-nginx.conf
ssh user@server "sudo mv /tmp/partner-portal-nginx.conf /etc/nginx/sites-available/partner-portal"

# Enable the site if not already enabled
ssh user@server "if [ ! -f /etc/nginx/sites-enabled/partner-portal ]; then sudo ln -s /etc/nginx/sites-available/partner-portal /etc/nginx/sites-enabled/; fi"

# Test Nginx configuration
ssh user@server "sudo nginx -t"

# Restart Nginx
echo "Restarting web server..."
ssh user@server "sudo systemctl restart nginx"

echo "Partner-portal deployment completed successfully!"

# Instructions for manual deployment
echo ""
echo "If you prefer manual deployment, follow these steps:"
echo "1. Run 'npm run build' to create the production build"
echo "2. Copy the files from the 'dist' directory to your web server"
echo "3. Configure your web server to serve the files"
echo "4. Ensure all API endpoints are correctly configured"

exit 0 