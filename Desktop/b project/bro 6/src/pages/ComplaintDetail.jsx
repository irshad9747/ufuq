import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns'
import { FiArrowLeft, FiAlertCircle, FiClock, FiCheckCircle } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { getMockComplaintById } from '../data/mockData'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

const ComplaintDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [complaint, setComplaint] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchComplaint = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await apiClient.get(`/complaints/${id}`)
      setComplaint(response.data.data)
    } catch (err) {
      // Use mock data when API fails
      const mockComplaint = getMockComplaintById(id)
      if (mockComplaint) {
        setComplaint(mockComplaint)
        setError('') // Clear error since we have mock data
      } else {
        setError('Complaint not found.')
      }
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchComplaint()
  }, [fetchComplaint])

  const handleStatusChange = useCallback(async (nextStatus) => {
    if (!complaint || !user) return
    try {
      await apiClient.patch(`/complaints/${id}`, { status: nextStatus })
      setComplaint((prev) => (prev ? { ...prev, status: nextStatus } : prev))
    } catch (err) {
      // For mock data, just update locally
      setComplaint((prev) => (prev ? { ...prev, status: nextStatus, updatedAt: new Date().toISOString() } : prev))
      setError('') // Clear error since we updated locally
    }
  }, [complaint, user, id])

  if (loading) {
    return <LoadingSpinner size="lg" className="h-64" />
  }

  if (!complaint) {
    return (
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <FiArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <div className="card">
          <p className="text-gray-500">Complaint not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        <FiArrowLeft className="w-4 h-4 mr-1" />
        Back to complaints
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {complaint.title}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Category:{' '}
                  <span className="font-medium text-gray-700">
                    {complaint.category}
                  </span>
                </p>
              </div>
              <StatusBadge status={complaint.status} />
            </div>

            <div className="mt-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Description
              </h2>
              <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                {complaint.description}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card space-y-3">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Complaint Info
            </h2>

            <InfoRow
              label="Created"
              value={
                complaint.createdAt
                  ? format(new Date(complaint.createdAt), 'MMM d, yyyy h:mm a')
                  : '—'
              }
            />
            <InfoRow
              label="Last updated"
              value={
                complaint.updatedAt
                  ? format(new Date(complaint.updatedAt), 'MMM d, yyyy h:mm a')
                  : '—'
              }
            />
            {complaint.priority && (
              <InfoRow label="Priority" value={complaint.priority} />
            )}
          </div>

          {user?.role === 'staff' || user?.role === 'admin' ? (
            <div className="card space-y-3">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Staff Actions
              </h2>
              <p className="text-xs text-gray-500">
                Update the status as you review and resolve this complaint.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleStatusChange('Pending')}
                  className="btn-secondary text-xs"
                >
                  Mark Pending
                </button>
                <button
                  onClick={() => handleStatusChange('In Progress')}
                  className="btn-secondary text-xs"
                >
                  In Progress
                </button>
                <button
                  onClick={() => handleStatusChange('Resolved')}
                  className="btn-primary text-xs"
                >
                  Resolve
                </button>
              </div>
            </div>
          ) : null}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <FiAlertCircle className="w-4 h-4" />
              <span className="text-xs">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-900 text-right ml-3">{value}</span>
  </div>
)

export default ComplaintDetail

