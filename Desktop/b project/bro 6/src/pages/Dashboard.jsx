import { useState, useEffect, useCallback } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { format } from 'date-fns'
import { 
  FiFileText, 
  FiPlus,
  FiTrendingUp,
  FiClock,
  FiCheckCircle
} from 'react-icons/fi'
import { getMockComplaints } from '../data/mockData'
import apiClient from '../utils/api'
import StatusBadge from '../components/StatusBadge'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  })
  const [recentComplaints, setRecentComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const response = await apiClient.get('/complaints')
      const complaints = response.data.data || []

      setStats({
        total: complaints.length,
        pending: complaints.filter(c => c.status === 'Pending').length,
        inProgress: complaints.filter(c => c.status === 'In Progress').length,
        resolved: complaints.filter(c => c.status === 'Resolved').length
      })

      setRecentComplaints(complaints.slice(0, 5))
    } catch (error) {
      // Use mock data when API fails
      const mockComplaints = getMockComplaints()
      setStats({
        total: mockComplaints.length,
        pending: mockComplaints.filter(c => c.status === 'Pending').length,
        inProgress: mockComplaints.filter(c => c.status === 'In Progress').length,
        resolved: mockComplaints.filter(c => c.status === 'Resolved').length
      })
      setRecentComplaints(mockComplaints.slice(0, 5))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Redirect admin users to staff dashboard
  if (user?.role === 'admin' || user?.role === 'staff') {
    return <Navigate to="/staff" replace />
  }

  if (loading) {
    return <LoadingSpinner size="lg" className="h-64" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}!</p>
        </div>
        {user?.role === 'student' && (
          <Link
            to="/complaints/new"
            className="btn-primary flex items-center space-x-2"
          >
            <FiPlus className="w-5 h-5" />
            <span>New Complaint</span>
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card transform transition-all duration-200 hover:scale-105 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Complaints</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center transition-transform duration-200 hover:rotate-6">
              <FiFileText className="text-gray-800 w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="card transform transition-all duration-200 hover:scale-105 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-red-600">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center transition-transform duration-200 hover:rotate-6">
              <FiClock className="text-red-600 w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="card transform transition-all duration-200 hover:scale-105 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">In Progress</p>
              <p className="text-3xl font-bold text-gray-800">{stats.inProgress}</p>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center transition-transform duration-200 hover:rotate-6">
              <FiTrendingUp className="text-gray-800 w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="card transform transition-all duration-200 hover:scale-105 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Resolved</p>
              <p className="text-3xl font-bold text-gray-700">{stats.resolved}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center transition-transform duration-200 hover:rotate-6">
              <FiCheckCircle className="text-gray-700 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Complaints */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Complaints</h2>
          <Link
            to="/complaints"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View All →
          </Link>
        </div>

        {recentComplaints.length === 0 ? (
          <EmptyState
            icon={FiFileText}
            title="No complaints yet"
            message="You haven't submitted any complaints. Create your first one to get started."
            action={() => navigate('/complaints/new')}
            actionLabel="Create Your First Complaint"
          />
        ) : (
          <div className="space-y-4">
            {recentComplaints.map((complaint) => (
              <Link
                key={complaint._id}
                to={`/complaints/${complaint._id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-red-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{complaint.title}</h3>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                      {complaint.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="font-medium">{complaint.category}</span>
                      <span>•</span>
                      <span>{format(new Date(complaint.createdAt), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <StatusBadge status={complaint.status} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

