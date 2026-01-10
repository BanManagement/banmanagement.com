import PropTypes from 'prop-types'
import Link from 'next/link'
import { FaInfoCircle, FaExternalLinkAlt } from 'react-icons/fa'

const dependencyInfo = {
  banmanager: {
    name: 'BanManager',
    downloadUrl: '/download/banmanager'
  },
  webenhancer: {
    name: 'WebEnhancer',
    downloadUrl: '/download/webenhancer'
  }
}

export const DependencyBanner = ({ requires = [], requiresDatabase, installUrl }) => {
  if (requires.length === 0 && !requiresDatabase) {
    return null
  }

  const dependencyNames = requires.map((dep) => dependencyInfo[dep]?.name || dep)
  let message = ''

  if (requires.length > 0 && requiresDatabase) {
    message = `Requires: ${dependencyNames.join(' + ')} + ${requiresDatabase} configured`
  } else if (requires.length > 0) {
    message = `Requires: ${dependencyNames.join(' + ')}`
  } else if (requiresDatabase) {
    message = `Requires: ${requiresDatabase} configured`
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <FaInfoCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-gray-700 font-medium">{message}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {requires.map((dep) => {
              const info = dependencyInfo[dep]
              if (!info) return null
              return (
                <Link
                  key={dep}
                  href={info.downloadUrl}
                  className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-800 underline"
                >
                  Download {info.name}
                </Link>
              )
            })}
            {installUrl && (
              <Link
                href={installUrl}
                className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-800 underline"
              >
                <FaExternalLinkAlt className="w-3 h-3" />
                View Install Guide
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

DependencyBanner.propTypes = {
  requires: PropTypes.arrayOf(PropTypes.string),
  requiresDatabase: PropTypes.string,
  installUrl: PropTypes.string
}
