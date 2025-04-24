import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productService } from '../services/api'
import { useCart } from '../context/CartContext.jsx'
import { toast } from 'react-toastify'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProduct(id)
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    toast.success('Product added to cart!')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-600">Product not found</h2>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="grid grid-cols-4 gap-2">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-75"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary">
            ${product.price}
          </p>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-xl"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-xl"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Category:</span>{' '}
                {product.category}
              </li>
              <li>
                <span className="font-medium">Stock:</span>{' '}
                {product.stock} units available
              </li>
              <li>
                <span className="font-medium">Rating:</span>{' '}
                {product.rating}/5
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails 