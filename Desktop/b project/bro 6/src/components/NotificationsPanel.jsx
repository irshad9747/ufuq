import { useState, useEffect, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { FiX, FiMessageSquare, FiCheckCircle, FiAlertCircle, FiClock, FiTrendingUp } from 'react-icons/fi'
import { Link } from 'react-router-dom'

// Demo notifications data
const getDemoNotifications = () => {
  const now = new Date()
  return [
    {
      id: '1',
      type: 'status_update',
      title: 'Status Update',
      message: 'Your complaint "Internet Connection Issues in Lab 3" has been updated to "In Progress"',
      complaintId: '1',
      complaintTitle: 'Internet Connection Issues in Lab 3',
      timestamp: new Date(now - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      icon: FiTrendingUp
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'Staff member replied to your complaint: "We are investigating the issue and will update you soon."',
      complaintId: '2',
      complaintTitle: 'Mentor Not Responding to Messages',
      timestamp: new Date(now - 5 * 60 * 60 * 1000), // 5 hours ago
      read: false,
      icon: FiMessageSquare
    },
    {
      id: '3',
      type: 'status_update',
      title: 'Status Update',
      message: 'Your complaint "Task Deadline Extension Request" has been resolved',
      complaintId: '3',
      complaintTitle: 'Task Deadline Extension Request',
      timestamp: new Date(now - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      read: false,
      icon: FiCheckCircle
    },
    {
      id: '4',
      type: 'message',
      title: 'New Message',
      message: 'Staff member added a note: "Extension approved. Please submit by the new deadline."',
      complaintId: '3',
      complaintTitle: 'Task Deadline Extension Request',
      timestamp: new Date(now - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      icon: FiMessageSquare
    },
    {
      id: '5',
      type: 'status_update',
      title: 'Status Update',
      message: 'Your complaint "Air Conditioning Not Working" is now pending review',
      complaintId: '4',
      complaintTitle: 'Air Conditioning Not Working',
      timestamp: new Date(now - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
      icon: FiClock
    },
    {
      id: '6',
      type: 'message',
      title: 'New Message',
      message: 'Staff member replied: "We have scheduled maintenance for tomorrow."',
      complaintId: '4',
      complaintTitle: 'Air Conditioning Not Working',
      timestamp: new Date(now - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
      icon: FiMessageSquare
    }
  ]
}

const NotificationsPanel = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(getDemoNotifications())
  const panelRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 px-2 sm:px-4 sm:pr-6 lg:pr-8 pointer-events-none">
      <div
        ref={panelRef}
        className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md pointer-events-auto animate-in fade-in zoom-in-95"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
          <div className="flex items-center space-x-2">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Notifications</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full animate-pulse">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Close notifications"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="max-h-[60vh] sm:max-h-96 overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <FiAlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => {
                const Icon = notification.icon
                const timeAgo = formatDistanceToNow(notification.timestamp, { addSuffix: true })

                return (
                  <Link
                    key={notification.id}
                    to={`/complaints/${notification.complaintId}`}
                    onClick={() => {
                      markAsRead(notification.id)
                      onClose()
                    }}
                    className={`block px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 active:bg-gray-100 transition-all duration-150 ${
                      !notification.read ? 'bg-red-50/30 border-l-2 border-red-500' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-200 ${
                        notification.type === 'status_update'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="flex-shrink-0">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></div>
                                </div>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1.5 truncate">
                              {notification.complaintTitle}
                            </p>
                            <p className="text-xs text-gray-400 mt-1.5">
                              {timeAgo}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white rounded-b-xl">
            <Link
              to="/complaints"
              onClick={onClose}
              className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium text-center block transition-colors duration-200"
            >
              View all complaints →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationsPanel
