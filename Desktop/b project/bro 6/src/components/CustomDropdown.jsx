import { useState, useEffect, useRef } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

const CustomDropdown = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  className = '',
  label,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const selectedOption = options.find(opt => 
    typeof opt === 'string' ? opt === value : opt.value === value
  )

  const handleSelect = (optionValue) => {
    onChange(optionValue)
    setIsOpen(false)
    setHoveredIndex(-1)
  }

  const displayValue = selectedOption 
    ? (typeof selectedOption === 'string' ? selectedOption : selectedOption.label)
    : placeholder

  const optionsList = options.map(opt => typeof opt === 'string' ? { value: opt, label: opt } : opt)

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full px-4 py-2.5 text-left bg-white border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
            transition-all duration-200 hover:border-gray-400
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60
            flex items-center justify-between
            ${isOpen ? 'border-red-500 ring-2 ring-red-500' : ''}
          `}
        >
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>
            {displayValue}
          </span>
          <span className="text-gray-400 transition-transform duration-200">
            {isOpen ? (
              <FiChevronUp className="w-5 h-5 text-red-600" />
            ) : (
              <FiChevronDown className="w-5 h-5" />
            )}
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="py-1 max-h-60 overflow-auto">
              {optionsList.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-500">No options available</div>
              ) : (
                optionsList.map((option, index) => {
                  const optionValue = option.value
                  const optionLabel = option.label
                  const isSelected = value === optionValue
                  const isHovered = hoveredIndex === index

                  return (
                    <button
                      key={optionValue}
                      type="button"
                      onClick={() => handleSelect(optionValue)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(-1)}
                      className={`
                        w-full text-left px-4 py-2 text-sm transition-colors duration-150
                        ${isSelected 
                          ? 'bg-red-50 text-red-900 font-medium' 
                          : isHovered
                          ? 'bg-red-50 text-red-800'
                          : 'text-gray-900 hover:bg-gray-50'
                        }
                      `}
                    >
                      {optionLabel}
                    </button>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomDropdown
