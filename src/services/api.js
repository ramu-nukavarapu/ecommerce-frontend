import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Authentication services
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/user/login', credentials)
    localStorage.setItem('token', response.data.accessToken)
    localStorage.setItem('refreshToken', response.data.refreshToken)
    return response.data
  },
  register: async (userData) => {
    const response = await api.post('/user/signup', userData)
    return response.data
  },
}

// Product services
export const productService = {
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params })
    return response.data
  },
  getProduct: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },
}

// Cart services
export const cartService = {
  getCartItems: async () => {
    const response = await api.get('/cart')
    return response.data
  },
  addToCart: async (productId, quantity) => {
    const response = await api.post('/cart/add', { productId, quantity })
    return response.data
  },
  removeFromCart: async (productId) => {
    const response = await api.delete(`/cart/remove/${productId}`)
    return response.data
  },
}

// Category services
export const categoryService = {
  getCategories: async () => {
    const response = await api.get('/categories')
    return response.data
  },
}

// Order services (placeholder - to be implemented when backend supports orders)
export const orderService = {
  createOrder: async () => {
    throw new Error('Order functionality not implemented yet')
  },
  getOrders: async () => {
    throw new Error('Order functionality not implemented yet')
  },
  getOrder: async () => {
    throw new Error('Order functionality not implemented yet')
  },
}

export default api 