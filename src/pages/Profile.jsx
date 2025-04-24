import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService, orderService } from '../services/api'
import { toast } from 'react-toastify'

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, ordersData] = await Promise.all([
          authService.getProfile(),
          orderService.getOrders(),
        ])
        setUser(userData)
        setOrders(ordersData)
      } catch (error) {
        toast.error('Failed to load profile data')
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    toast.success('Logged out successfully')
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">Profile Information</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-6 text-red-500 hover:text-red-700 font-semibold"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Order History</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders found</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold">
                      Total: ${order.total.toFixed(2)}
                    </p>
                    <div className="mt-2">
                      {order.items.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <span>{item.quantity}x</span>
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile 