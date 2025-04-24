import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/products/${product._id}`}>
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={product.image || 'https://via.placeholder.com/300'}
            alt={product.name}
            className="object-cover w-full h-48"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-blue-600">
              ${product.price}
            </span>
            <span className="text-sm text-gray-500">{product.category}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard 