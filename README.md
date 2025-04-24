# E-Commerce Frontend

A modern e-commerce web application built with React, Vite, and Tailwind CSS, featuring a responsive design and seamless user experience.

## 🚀 Features

- 🔐 User Authentication (Login/Register)
- 🛍️ Product Listing with Advanced Filtering
- 📱 Responsive Design for all devices
- 🛒 Shopping Cart Management
- 🔍 Category-based Navigation
- 💰 Price Range Filtering
- 📄 Pagination Support
- 🔄 Real-time Updates

## 🛠️ Tech Stack

- ⚛️ React 19
- ⚡ Vite (Build Tool)
- 🎨 Tailwind CSS (Styling)
- 🔄 React Router (Navigation)
- 📦 Zustand (State Management)
- 🔌 Axios (API Client)
- 🎯 React Icons (Icon Library)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git
- Backend server running (see [Backend Setup](#backend-setup))

## 🏗️ Project Structure

```
ecommerce-frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.jsx   # Navigation bar
│   │   ├── ProductCard.jsx # Product display card
│   │   ├── FilterSidebar.jsx # Filter sidebar
│   │   └── ...
│   ├── context/         # React Context providers
│   │   ├── UserContext.jsx # User authentication
│   │   └── CartContext.jsx # Shopping cart
│   ├── layouts/         # Page layouts
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── Login.jsx
│   │   └── ...
│   ├── services/        # API services
│   │   └── api.js       # API client
│   ├── App.jsx          # Main application
│   └── main.jsx         # Entry point
├── .env                 # Environment variables
├── package.json         # Project dependencies
└── vite.config.js       # Vite configuration
```

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/ramu-nukavarapu/ecommerce-frontend.git
cd ecommerce-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory with the following:
```
VITE_API_URL=http://localhost:3000
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔑 Key Features

### Authentication
- Secure login and registration
- JWT token management
- Protected routes
- User profile management

### Products
- Grid/List view options
- Advanced filtering by:
  - Category
  - Price range
  - Search
- Pagination support
- Detailed product view

### Shopping Cart
- Add/remove items
- Quantity management
- Real-time updates
- Checkout process

## 🔌 API Integration

The frontend communicates with the backend through these endpoints:

### Authentication
- `POST /user/login` - User login
- `POST /user/signup` - User registration

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product details
- `GET /products?category=:category` - Filter by category
- `GET /products?minPrice=:min&maxPrice=:max` - Filter by price

### Cart
- `GET /cart` - Get cart items
- `POST /cart/add` - Add to cart
- `DELETE /cart/remove/:id` - Remove from cart

## 🎨 Styling

The application uses Tailwind CSS for styling. Custom styles can be added in:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles
- Component-specific styles using Tailwind classes

## 📱 Responsive Design

The application is fully responsive and works on:
- Mobile devices
- Tablets
- Desktop computers
- Different screen orientations

## 🔄 State Management

The application uses React Context for:
- User authentication state
- Shopping cart state
- Global UI state
