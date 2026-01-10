import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiAlertCircle, FiFileText, FiTag } from 'react-icons/fi'
import CustomDropdown from '../components/CustomDropdown'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

const categories = [
  'Mentor Issue',
  'Task Issue',
  'Facilities',
  'Peer Issue',
  'Administrative',
  'Other'
]

const priorities = ['Low', 'Medium', 'High', 'Urgent']

const NewComplaint = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!title || !category || !description) {
      setError('Please fill in all required fields.')
      return
    }

    setSubmitting(true)
    try {
      await apiClient.post('/complaints', {
        title,
        category,
        description,
        priority
      })
      navigate('/complaints')
    } catch (err) {
      setError('Failed to submit complaint. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Submit New Complaint</h1>
        <p className="text-gray-600 mt-1">
          Share your concern with the staff. Your complaint will be handled
          confidentially and respectfully.
        </p>
      </div>

      {/* Form */}
      <div className="card">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
            <FiAlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <div className="relative">
              <FiFileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field pl-10"
                placeholder="Brief summary of your issue"
                required
              />
            </div>
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <CustomDropdown
                label="Category"
                value={category}
                onChange={setCategory}
                options={[
                  { value: '', label: 'Select category' },
                  ...categories.map(c => ({ value: c, label: c }))
                ]}
                placeholder="Select category"
              />
            </div>

            <div>
              <CustomDropdown
                label="Priority"
                value={priority}
                onChange={setPriority}
                options={priorities}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field resize-none"
              placeholder="Describe your situation in detail..."
              required
            />
            <p className="mt-1 text-xs text-gray-400">
              Please avoid sharing sensitive passwords or private keys.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting…' : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewComplaint

