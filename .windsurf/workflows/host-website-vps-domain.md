---
description: Complete guide to host website on Hostinger VPS with GoDaddy domain
---

# Website Hosting Guide: Hostinger VPS + GoDaddy Domain

## Prerequisites
- Hostinger VPS hosting account purchased
- GoDaddy domain purchased
- SSH client (PuTTY for Windows, Terminal for Mac/Linux)
- Website files ready to upload

## Step 1: Access Your Hostinger VPS

### 1.1 Get VPS Credentials
1. Log into Hostinger control panel
2. Navigate to VPS section
3. Find your VPS server details
4. Note down:
   - IP address
   - SSH username (usually 'root')
   - SSH password or SSH key

### 1.2 Connect via SSH
**Using PuTTY (Windows):**
1. Download and install PuTTY
2. Enter your VPS IP address
3. Click Open
4. Login with username and password

**Using Terminal (Mac/Linux):**
```bash
ssh root@YOUR_VPS_IP_ADDRESS
```

## Step 2: Initial VPS Setup

### 2.1 Update System
```bash
apt update && apt upgrade -y
```

### 2.2 Install Required Software
```bash
# For Apache web server
apt install apache2 -y

# For Nginx web server (alternative)
# apt install nginx -y

# Install PHP
apt install php php-mysql php-curl php-gd php-mbstring php-xml php-xmlrpc -y

# Install MySQL/MariaDB
apt install mariadb-server -y

# Install FTP server (optional)
apt install vsftpd -y
```

### 2.3 Configure Firewall
```bash
ufw allow OpenSSH
ufw allow 'Apache Full'
ufw enable
```

## Step 3: Configure Web Server

### 3.1 Apache Configuration
```bash
# Enable Apache modules
a2enmod rewrite
systemctl restart apache2

# Create virtual host
nano /etc/apache2/sites-available/yourdomain.com.conf
```

Add this configuration:
```apache
<VirtualHost *:80>
    ServerAdmin admin@yourdomain.com
    ServerName yourdomain.com
    ServerName www.yourdomain.com
    DocumentRoot /var/www/yourdomain.com
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

### 3.2 Enable Site and Create Directory
```bash
# Enable the site
a2ensite yourdomain.com.conf
a2dissite 000-default.conf

# Create website directory
mkdir -p /var/www/yourdomain.com
chown -R www-data:www-data /var/www/yourdomain.com
chmod -R 755 /var/www/yourdomain.com

# Restart Apache
systemctl restart apache2
```

## Step 4: Upload Website Files

### 4.1 Using SCP (Command Line)
```bash
# From your local machine
scp -r /path/to/your/website/* root@YOUR_VPS_IP:/var/www/yourdomain.com/
```

### 4.2 Using FTP (FileZilla)
1. Install FileZilla
2. Connect using SFTP:
   - Host: YOUR_VPS_IP
   - Username: root
   - Password: your SSH password
   - Port: 22
3. Navigate to `/var/www/yourdomain.com`
4. Upload your website files

## Step 5: Configure GoDaddy Domain

### 5.1 Update DNS Records
1. Log into GoDaddy account
2. Go to Domain Management
3. Select your domain
4. Click "DNS Management"
5. Edit/Update these records:

**A Record:**
- Type: A
- Name: @
- Value: YOUR_VPS_IP_ADDRESS
- TTL: 1 Hour

**A Record (www):**
- Type: A
- Name: www
- Value: YOUR_VPS_IP_ADDRESS
- TTL: 1 Hour

### 5.2 Nameservers (if needed)
If GoDaddy asks for nameservers, use:
- ns1.hostinger.com
- ns2.hostinger.com
- ns3.hostinger.com
- ns4.hostinger.com

## Step 6: Install SSL Certificate (HTTPS)

### 6.1 Install Certbot
```bash
apt install certbot python3-certbot-apache -y
```

### 6.2 Obtain SSL Certificate
```bash
certbot --apache -d yourdomain.com -d www.yourdomain.com
```

### 6.3 Auto-renewal Setup
```bash
crontab -e
```
Add this line:
```
0 12 * * * /usr/bin/certbot renew --quiet
```

## Step 7: Database Setup (if needed)

### 7.1 Secure MySQL/MariaDB
```bash
mysql_secure_installation
```

### 7.2 Create Database and User
```bash
mysql -u root -p
```
```sql
CREATE DATABASE your_database_name;
CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON your_database_name.* TO 'your_username'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## Step 8: Test Your Website

### 8.1 Check HTTP Response
```bash
curl -I http://yourdomain.com
```

### 8.2 Verify SSL
```bash
curl -I https://yourdomain.com
```

### 8.3 Browser Testing
1. Open browser
2. Navigate to yourdomain.com
3. Check for proper loading
4. Test all pages and functionality

## Step 9: Security Hardening

### 9.1 Basic Security
```bash
# Change SSH port (optional but recommended)
nano /etc/ssh/sshd_config
# Change Port 22 to something else

# Disable root login (create user first)
adduser yourusername
usermod -aG sudo yourusername
# Then disable root login in sshd_config

# Restart SSH
systemctl restart ssh
```

### 9.2 Install Fail2Ban
```bash
apt install fail2ban -y
systemctl enable fail2ban
systemctl start fail2ban
```

## Step 10: Monitoring and Maintenance

### 10.1 Setup Monitoring
```bash
# Install htop for monitoring
apt install htop -y

# Check system resources
htop
df -h
free -h
```

### 10.2 Regular Updates
```bash
# Set up automatic updates
apt install unattended-upgrades -y
dpkg-reconfigure unattended-upgrades
```

## Troubleshooting Common Issues

### Website Not Loading
1. Check Apache status: `systemctl status apache2`
2. Check error logs: `tail -f /var/log/apache2/error.log`
3. Verify DNS propagation: `nslookup yourdomain.com`
4. Check firewall: `ufw status`

### Database Connection Issues
1. Check MySQL status: `systemctl status mariadb`
2. Test connection: `mysql -u your_username -p`
3. Check credentials in config files

### SSL Certificate Issues
1. Check certificate status: `certbot certificates`
2. Renew manually: `certbot renew`
3. Check Apache config: `apache2ctl configtest`

## Important Notes

- **DNS Propagation:** Can take 24-48 hours after changing DNS records
- **Backups:** Regularly backup your website files and database
- **Updates:** Keep your server and software updated regularly
- **Monitoring:** Monitor server resources and website uptime
- **Security:** Use strong passwords and keep SSH keys secure

## Contact Support
- **Hostinger:** 24/7 live chat and ticket system
- **GoDaddy:** Phone and chat support for domain issues
- **Documentation:** Both providers have extensive knowledge bases

This guide covers the complete process from VPS setup to a fully functional website with SSL security.
