import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { format } from 'date-fns'
import {
  FiUsers,
  FiFileText,
  FiTrendingUp,
  FiCheckCircle,
  FiAlertCircle,
  FiSearch,
  FiX,
  FiEdit3
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { getMockComplaints } from '../data/mockData'
import CustomDropdown from '../components/CustomDropdown'
import apiClient from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'
import StatusBadge from '../components/StatusBadge'

const StaffDashboard = () => {
  const { user } = useAuth()
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('Active')
  const [search, setSearch] = useState('')
  const [contextMenu, setContextMenu] = useState(null)
  const [editModal, setEditModal] = useState(null)
  const [newStatus, setNewStatus] = useState('')
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const tableRef = useRef(null)

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

  const stats = useMemo(() => {
    const total = complaints.length
    const pending = complaints.filter((c) => c.status === 'Pending').length
    const inProgress = complaints.filter((c) => c.status === 'In Progress').length
    const resolved = complaints.filter((c) => c.status === 'Resolved').length
    return { total, pending, inProgress, resolved }
  }, [complaints])

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === 'All'
          ? true
          : statusFilter === 'Active'
          ? c.status === 'Pending' || c.status === 'In Progress'
          : c.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [complaints, search, statusFilter])


  const handleRightClick = (e, complaint) => {
    e.preventDefault()
    const x = Math.min(e.clientX, window.innerWidth - 200)
    const y = Math.min(e.clientY, window.innerHeight - 100)
    setContextMenu({
      x,
      y,
      complaint: complaint
    })
  }

  const handleCloseContextMenu = () => {
    setContextMenu(null)
  }

  const handleEditStatus = () => {
    if (contextMenu?.complaint) {
      setEditModal(contextMenu.complaint)
      setNewStatus(contextMenu.complaint.status)
      setNote('')
      setContextMenu(null)
    }
  }

  const handleCloseModal = () => {
    setEditModal(null)
    setNewStatus('')
    setNote('')
    setSubmitting(false)
  }

  const handleSubmitStatusChange = async () => {
    if (!editModal || !newStatus) return

    setSubmitting(true)
    try {
      const updateData = { status: newStatus }
      if (note.trim()) {
        updateData.note = note.trim()
      }

      await apiClient.patch(
        `/complaints/${editModal._id}`,
        updateData
      )

      // Update local state
      setComplaints((prev) =>
        prev.map((c) =>
          c._id === editModal._id
            ? {
                ...c,
                status: newStatus,
                updatedAt: new Date().toISOString(),
                notes: note.trim() ? [...(c.notes || []), { note: note.trim(), createdAt: new Date().toISOString(), addedBy: user?.name || 'Staff' }] : c.notes
              }
            : c
        )
      )

      handleCloseModal()
    } catch (err) {
      // For mock data, just update locally
      setComplaints((prev) =>
        prev.map((c) =>
          c._id === editModal._id
            ? {
                ...c,
                status: newStatus,
                updatedAt: new Date().toISOString(),
                notes: note.trim() ? [...(c.notes || []), { note: note.trim(), createdAt: new Date().toISOString(), addedBy: user?.name || 'Staff' }] : c.notes
              }
            : c
        )
      )
      handleCloseModal()
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenu && !e.target.closest('.context-menu')) {
        setContextMenu(null)
      }
    }

    if (contextMenu) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [contextMenu])

  if (!user || (user.role !== 'staff' && user.role !== 'admin')) {
    return (
      <div className="card">
        <p className="text-gray-600">
          Staff dashboard is only available for staff and admin users.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage all student complaints across the platform.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
            <FiUsers className="text-white w-5 h-5" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-gray-500 capitalize text-xs">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card transform transition-all duration-200 hover:scale-105 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Complaints</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center transition-transform duration-200 hover:rotate-6">
              <FiFileText className="text-gray-800 w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="card transform transition-all duration-200 hover:scale-105 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-red-600">{stats.pending}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center transition-transform duration-200 hover:rotate-6">
              <FiAlertCircle className="text-red-600 w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="card transform transition-all duration-200 hover:scale-105 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">In Progress</p>
              <p className="text-3xl font-bold text-gray-800">{stats.inProgress}</p>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center transition-transform duration-200 hover:rotate-6">
              <FiTrendingUp className="text-gray-800 w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="card transform transition-all duration-200 hover:scale-105 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Resolved</p>
              <p className="text-3xl font-bold text-gray-700">{stats.resolved}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center transition-transform duration-200 hover:rotate-6">
              <FiCheckCircle className="text-gray-700 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by title, description, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-500 whitespace-nowrap">Status</span>
            <CustomDropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: 'Active', label: 'Active (Pending & In Progress)' },
                { value: 'All', label: 'All' },
                { value: 'Pending', label: 'Pending' },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'Resolved', label: 'Resolved' }
              ]}
              className="min-w-[160px]"
            />
          </div>
        </div>
      </div>

      {/* List */}
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
            message="No complaints match the current filters."
          />
        ) : (
          <div className="overflow-x-auto -mx-6">
            <div className="px-6">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
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
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100" ref={tableRef}>
                {filteredComplaints.map((c) => (
                  <tr
                    key={c._id}
                    className="hover:bg-gray-50 cursor-context-menu transition-colors duration-150"
                    onContextMenu={(e) => handleRightClick(e, c)}
                  >
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {c.user?.name || c.user?.email || 'Student'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {c.title}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1 mt-1">
                        {c.description}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {c.category}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                      {c.createdAt
                        ? format(new Date(c.createdAt), 'MMM d, yyyy')
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="context-menu fixed bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1 min-w-[180px] animate-in fade-in zoom-in-95 duration-150"
          style={{
            left: `${contextMenu.x}px`,
            top: `${contextMenu.y}px`,
          }}
        >
          <button
            onClick={handleEditStatus}
            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200 flex items-center space-x-2 transition-colors duration-150 rounded-md mx-1"
          >
            <FiEdit3 className="w-4 h-4" />
            <span>Edit Status</span>
          </button>
        </div>
      )}

      {/* Edit Status Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Edit Complaint Status</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Complaint Title</p>
              <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border border-gray-200">
                {editModal.title}
              </p>
            </div>

            <div className="mb-4">
              <CustomDropdown
                label="Status"
                value={newStatus}
                onChange={setNewStatus}
                options={[
                  { value: 'Pending', label: 'Pending' },
                  { value: 'In Progress', label: 'In Progress' },
                  { value: 'Resolved', label: 'Resolved' }
                ]}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="input-field resize-none"
                placeholder="Add a note about this status change..."
              />
              <p className="text-xs text-gray-500 mt-1">
                This note will be saved with the status update.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                disabled={submitting}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitStatusChange}
                disabled={submitting || !newStatus}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StaffDashboard

