# OceanR Enterprises - API Documentation

Base URL: `http://localhost:5000/api` (Development)  
Production: `https://your-domain.com/api`

## Authentication

Most admin endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Login

**POST** `/api/auth/login`

Authenticate admin user and receive JWT token.

**Request Body:**
```json
{
  "email": "admin@oceanr.com",
  "password": "ChangeMe123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Admin",
    "email": "admin@oceanr.com",
    "role": "superadmin"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid credentials
- `400 Bad Request` - Validation error

---

## 📦 Product Endpoints

### Get All Products

**GET** `/api/products`

Retrieve all products with optional filters.

**Query Parameters:**
- `category` (optional) - Filter by category ID
- `search` (optional) - Search in name, description, SKU
- `featured` (optional) - Filter featured products (`true`/`false`)

**Example:**
```
GET /api/products?category=507f1f77bcf86cd799439011&featured=true
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Industrial Safety Helmet",
    "SKU": "PPE-HELM-001",
    "description": "High-quality industrial safety helmet...",
    "category": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "PPE Kits"
    },
    "images": [
      "https://res.cloudinary.com/..."
    ],
    "datasheet": "https://res.cloudinary.com/...",
    "specs": {
      "Material": "ABS Plastic",
      "Weight": "350g"
    },
    "featured": true,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
]
```

### Get Single Product

**GET** `/api/products/:id`

Retrieve a specific product by ID.

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Industrial Safety Helmet",
  "SKU": "PPE-HELM-001",
  "description": "High-quality industrial safety helmet...",
  "category": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "PPE Kits"
  },
  "images": ["https://res.cloudinary.com/..."],
  "datasheet": "https://res.cloudinary.com/...",
  "specs": {
    "Material": "ABS Plastic",
    "Weight": "350g"
  },
  "featured": true,
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `404 Not Found` - Product not found

### Create Product

**POST** `/api/products` 🔒 *Requires Authentication*

Create a new product with images and datasheet.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `data` (JSON string) - Product information
- `images` (files) - Product images (max 5)
- `datasheet` (file) - PDF datasheet

**Example data field:**
```json
{
  "name": "Digital Multimeter",
  "SKU": "ELEC-MULT-001",
  "description": "Professional digital multimeter...",
  "category": "507f1f77bcf86cd799439012",
  "specs": {
    "Display": "4000 Count LCD",
    "DC Voltage": "0-1000V"
  },
  "featured": false
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "Digital Multimeter",
  ...
}
```

**Error Responses:**
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not admin
- `400 Bad Request` - Validation error

### Update Product

**PUT** `/api/products/:id` 🔒 *Requires Authentication*

Update an existing product.

**Headers & Body:** Same as Create Product

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "Digital Multimeter (Updated)",
  ...
}
```

### Delete Product

**DELETE** `/api/products/:id` 🔒 *Requires Authentication*

Delete a product.

**Response (200 OK):**
```json
{
  "message": "Product removed"
}
```

---

## 📁 Category Endpoints

### Get All Categories

**GET** `/api/categories`

Retrieve all categories.

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "PPE Kits",
    "description": "Personal Protective Equipment for workplace safety",
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-15T10:00:00.000Z"
  }
]
```

### Get Single Category

**GET** `/api/categories/:id`

Retrieve a specific category.

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "PPE Kits",
  "description": "Personal Protective Equipment for workplace safety",
  "createdAt": "2025-01-15T10:00:00.000Z",
  "updatedAt": "2025-01-15T10:00:00.000Z"
}
```

### Create Category

**POST** `/api/categories` 🔒 *Requires Authentication*

Create a new category.

**Request Body:**
```json
{
  "name": "Power Tools",
  "description": "Electric and pneumatic power tools"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "name": "Power Tools",
  "description": "Electric and pneumatic power tools",
  "createdAt": "2025-01-15T11:00:00.000Z",
  "updatedAt": "2025-01-15T11:00:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Category already exists or validation error

### Update Category

**PUT** `/api/categories/:id` 🔒 *Requires Authentication*

Update an existing category.

**Request Body:**
```json
{
  "name": "Power Tools & Equipment",
  "description": "Updated description"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "name": "Power Tools & Equipment",
  "description": "Updated description",
  ...
}
```

### Delete Category

**DELETE** `/api/categories/:id` 🔒 *Requires Authentication*

Delete a category.

**Response (200 OK):**
```json
{
  "message": "Category removed"
}
```

---

## 💬 Quote Request Endpoints

### Get All Quotes

**GET** `/api/quotes` 🔒 *Requires Authentication*

Retrieve all quote requests (admin only).

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "productId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Industrial Safety Helmet",
      "SKU": "PPE-HELM-001"
    },
    "name": "John Doe",
    "company": "ABC Industries",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "message": "I need 50 units. Please provide quote.",
    "status": "pending",
    "createdAt": "2025-01-15T12:00:00.000Z",
    "updatedAt": "2025-01-15T12:00:00.000Z"
  }
]
```

### Create Quote Request

**POST** `/api/quotes`

Submit a new quote request (public endpoint).

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "company": "ABC Industries",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "message": "I need 50 units. Please provide quote."
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "productId": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Industrial Safety Helmet",
    "SKU": "PPE-HELM-001"
  },
  "name": "John Doe",
  "company": "ABC Industries",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "message": "I need 50 units. Please provide quote.",
  "status": "pending",
  "createdAt": "2025-01-15T12:00:00.000Z",
  "updatedAt": "2025-01-15T12:00:00.000Z"
}
```

**Note:** If email is configured, an email notification will be sent to the company.

### Update Quote Status

**PUT** `/api/quotes/:id` 🔒 *Requires Authentication*

Update the status of a quote request.

**Request Body:**
```json
{
  "status": "contacted"
}
```

**Valid statuses:** `pending`, `contacted`, `completed`

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "status": "contacted",
  ...
}
```

### Delete Quote

**DELETE** `/api/quotes/:id` 🔒 *Requires Authentication*

Delete a quote request.

**Response (200 OK):**
```json
{
  "message": "Quote request removed"
}
```

---

## 📊 Admin Endpoints

### Get Dashboard Statistics

**GET** `/api/admin/stats` 🔒 *Requires Authentication*

Get statistics for admin dashboard.

**Response (200 OK):**
```json
{
  "products": 25,
  "categories": 8,
  "quotes": 15,
  "pendingQuotes": 7
}
```

---

## 🏥 Health Check

### Server Health

**GET** `/api/health`

Check if the API server is running.

**Response (200 OK):**
```json
{
  "status": "OK",
  "message": "OceanR API is running"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, no token"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin only."
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error"
}
```

---

## Rate Limiting

API requests are rate-limited to prevent abuse:
- **Limit:** 100 requests per 15 minutes per IP
- **Headers:** Rate limit info included in response headers

---

## Postman Collection

Import this collection to test the API:

```json
{
  "info": {
    "name": "OceanR Enterprises API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"admin@oceanr.com\",\n  \"password\": \"ChangeMe123\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{baseUrl}}/auth/login",
              "host": ["{{baseUrl}}"],
              "path": ["auth", "login"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

---

## Code Examples

### JavaScript (Axios)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Login
const login = async () => {
  const response = await api.post('/auth/login', {
    email: 'admin@oceanr.com',
    password: 'ChangeMe123',
  });
  const token = response.data.token;
  localStorage.setItem('token', token);
};

// Get products with auth
const getProducts = async () => {
  const token = localStorage.getItem('token');
  const response = await api.get('/products', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Create product with file upload
const createProduct = async (productData, images, datasheet) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  
  formData.append('data', JSON.stringify(productData));
  images.forEach(img => formData.append('images', img));
  if (datasheet) formData.append('datasheet', datasheet);
  
  const response = await api.post('/products', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
```

### cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@oceanr.com","password":"ChangeMe123"}'

# Get products
curl http://localhost:5000/api/products

# Get products with filter
curl "http://localhost:5000/api/products?featured=true"

# Create quote request
curl -X POST http://localhost:5000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "phone":"+91 9876543210",
    "message":"Need quote for 50 units"
  }'

# Get admin stats (with auth)
curl http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

**API Version:** 1.0.0  
**Last Updated:** November 2025
