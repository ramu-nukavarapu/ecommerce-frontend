import { useState, useEffect } from 'react'
import { categoryService } from '../services/api'

const FilterSidebar = ({ onApplyFilters, selectedCategory }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [priceRange, setPriceRange] = useState({
    min: '',
    max: ''
  })
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories()
        setCategories(response)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      setSelectedCategories([selectedCategory])
    }
  }, [selectedCategory])

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category)
      } else {
        return [category] // Only allow one category at a time
      }
    })
  }

  const handlePriceChange = (e) => {
    const { name, value } = e.target
    setPriceRange(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleApply = () => {
    onApplyFilters({
      categories: selectedCategories,
      minPrice: priceRange.min,
      maxPrice: priceRange.max
    })
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>
      
      {/* Categories Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category._id || category} className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="rounded text-primary focus:ring-primary"
              />
              <span className="text-gray-700">{category.name || category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="min"
              placeholder="Min"
              value={priceRange.min}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              name="max"
              placeholder="Max"
              value={priceRange.max}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApply}
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Apply Filters
      </button>
    </div>
  )
}

export default FilterSidebar 