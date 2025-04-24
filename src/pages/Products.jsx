import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { productService } from '../services/api'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'

const Products = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const category = searchParams.get('category')
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState({
    categories: [],
    minPrice: '',
    maxPrice: ''
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const params = { 
          page, 
          limit: 9
        }

        // Add category filter if present in URL or selected in filters
        if (category) {
          params.category = category
        } else if (filters.categories.length > 0) {
          params.categories = filters.categories.join(',')
        }

        // Add price range filters if present
        if (filters.minPrice) {
          params.minPrice = filters.minPrice
        }
        if (filters.maxPrice) {
          params.maxPrice = filters.maxPrice
        }

        const response = await productService.getProducts(params)
        setProducts(response.results)
        setTotalPages(response.pages)
        setError(null)
      } catch (err) {
        setError('Failed to fetch products')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [page, category, filters])

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
    setPage(1) // Reset to first page when filters change
    
    // Update URL with selected categories if any
    if (newFilters.categories.length > 0) {
      navigate(`/products?category=${newFilters.categories[0]}`)
    } else {
      navigate('/products')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <FilterSidebar 
            onApplyFilters={handleApplyFilters}
            selectedCategory={category}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">
            {category ? `${category} Products` : 'All Products'}
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products 