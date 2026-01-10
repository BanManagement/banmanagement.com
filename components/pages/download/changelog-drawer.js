import { useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FaTimes, FaFileAlt } from 'react-icons/fa'
import { formatDistanceToNowStrict } from 'date-fns'
import clsx from 'clsx'

export const ChangelogDrawer = ({
  isOpen,
  onClose,
  version,
  publishedAt,
  changelog = []
}) => {
  const drawerRef = useRef(null)
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)

  // Store the element that had focus before opening
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement
      // Focus the close button when drawer opens
      setTimeout(() => closeButtonRef.current?.focus(), 0)
    } else if (previousFocusRef.current) {
      // Restore focus when drawer closes
      previousFocusRef.current.focus()
    }
  }, [isOpen])

  // Handle ESC key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose()
      }

      // Focus trap
      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  const timeAgo = publishedAt
    ? formatDistanceToNowStrict(new Date(publishedAt)) + ' ago'
    : ''

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="changelog-title"
        className={clsx(
          'fixed z-50 bg-white shadow-xl flex flex-col',
          // Mobile: full screen modal
          'inset-0',
          // Desktop: right-side drawer
          'lg:inset-y-0 lg:left-auto lg:right-0 lg:w-96 lg:max-w-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2
              id="changelog-title"
              className="text-lg font-bold text-gray-900 flex items-center gap-2"
            >
              <FaFileAlt className="w-5 h-5 text-primary-500" />
              Release Notes
            </h2>
            {version && (
              <p className="text-sm text-gray-600">
                {version}
                {timeAgo && <span className="text-gray-400"> • {timeAgo}</span>}
              </p>
            )}
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className={clsx(
              'p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
            )}
            aria-label="Close release notes"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {changelog.length > 0
            ? (
            <ul className="space-y-2">
              {changelog.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="text-primary-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
              )
            : (
            <p className="text-gray-500 text-sm">No changelog available.</p>
              )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className={clsx(
              'w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-colors',
              'bg-primary-500 text-white hover:bg-primary-700',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
            )}
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}

ChangelogDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  version: PropTypes.string,
  publishedAt: PropTypes.string,
  changelog: PropTypes.arrayOf(PropTypes.string)
}
