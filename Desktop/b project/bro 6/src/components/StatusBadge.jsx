import { FiClock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'

const StatusBadge = ({ status, showIcon = true }) => {
  const statusConfig = {
    'Pending': {
      className: 'status-badge status-pending',
      icon: <FiClock className="inline mr-1 w-3 h-3" />
    },
    'In Progress': {
      className: 'status-badge status-progress',
      icon: <FiAlertCircle className="inline mr-1 w-3 h-3" />
    },
    'Resolved': {
      className: 'status-badge status-resolved',
      icon: <FiCheckCircle className="inline mr-1 w-3 h-3" />
    }
  }

  const config = statusConfig[status] || {
    className: 'status-badge status-pending',
    icon: <FiClock className="inline mr-1 w-3 h-3" />
  }

  return (
    <span className={config.className}>
      {showIcon && config.icon}
      {status}
    </span>
  )
}

export default StatusBadge

