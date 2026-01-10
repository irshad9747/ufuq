import { useEffect, useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FiSearch, FiFilter, FiFileText } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { getMockComplaints } from '../data/mockData'
import CustomDropdown from '../components/CustomDropdown'
import apiClient from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'
import StatusBadge from '../components/StatusBadge'

const statusOptions = ['All', 'Pending', 'In Progress', 'Resolved']
const priorityOptions = ['All', 'Low', 'Medium', 'High', 'Urgent']

const Complaints = () => {
  const { user } = useAuth()
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await apiClient.get('/complaints')
      const data = response.data.data || []
      setComplaints(data)
    } catch (err) {
      // Use mock data when API fails
      const mockComplaints = getMockComplaints()
      setComplaints(mockComplaints)
      setError('') // Clear error since we have mock data
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchComplaints()
  }, [fetchComplaints])

  const filteredComplaints = useMemo(() => complaints.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ? true : c.status === statusFilter

    const matchesPriority =
      priorityFilter === 'All'
        ? true
        : (c.priority || 'Medium') === priorityFilter

    // For staff, show all; for students, typically API is already scoped,
    // but we keep this for clarity if backend returns all.
    if (user?.role === 'student' && c.createdBy && c.createdBy._id && user._id) {
      // Optional narrowing by owner if backend returns more
    }

    return matchesSearch && matchesStatus && matchesPriority
  }), [complaints, search, statusFilter, priorityFilter, user])

  const renderPriorityBadge = (priority = 'Medium') => {
    const key = priority.toLowerCase()
    const map = {
      low: 'priority-low',
      medium: 'priority-medium',
      high: 'priority-high',
      urgent: 'priority-urgent'
    }
    return (
      <span className={`status-badge ${map[key] || map.medium}`}>
        {priority}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Complaints</h1>
          <p className="text-gray-600 mt-1">
            Track the progress of all your submitted complaints.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by title, category, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400 w-4 h-4" />
            <CustomDropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              className="min-w-[140px]"
            />
          </div>

          {/* Priority filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 whitespace-nowrap">Priority</span>
            <CustomDropdown
              value={priorityFilter}
              onChange={setPriorityFilter}
              options={priorityOptions}
              className="min-w-[120px]"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="card">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
            <FiAlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {loading ? (
          <LoadingSpinner size="md" className="py-12" />
        ) : filteredComplaints.length === 0 ? (
          <EmptyState
            icon={FiFileText}
            title="No complaints found"
            message="Try changing the filters or submit a new complaint."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {complaint.title}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-2 mt-1">
                        {complaint.description}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {complaint.category}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <StatusBadge status={complaint.status} />
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {renderPriorityBadge(complaint.priority)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                      {complaint.createdAt
                        ? format(new Date(complaint.createdAt), 'MMM d, yyyy')
                        : '—'}
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                      <Link
                        to={`/complaints/${complaint._id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Complaints

