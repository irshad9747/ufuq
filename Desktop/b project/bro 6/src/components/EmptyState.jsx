import { FiFileText, FiInbox } from 'react-icons/fi'

const EmptyState = ({ 
  icon: Icon = FiInbox, 
  title = 'No items found', 
  message = 'There are no items to display.',
  action,
  actionLabel
}) => {
  return (
    <div className="text-center py-12">
      <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 max-w-sm mx-auto">{message}</p>
      {action && actionLabel && (
        <button onClick={action} className="btn-primary inline-flex items-center space-x-2">
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  )
}

export default EmptyState

