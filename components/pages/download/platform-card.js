import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { FaDownload, FaFlask } from 'react-icons/fa'
import clsx from 'clsx'

export const PlatformCard = ({
  platform,
  stableUrls = {},
  selectedVersion,
  onVersionChange,
  snapshotOnly = false
}) => {
  const hasVersions = !!platform.versions
  const versionKeys = hasVersions ? Object.keys(platform.versions) : []
  const [currentVersion, setCurrentVersion] = useState(
    selectedVersion || versionKeys[0] || null
  )

  useEffect(() => {
    if (selectedVersion && platform.versions?.[selectedVersion]) {
      setCurrentVersion(selectedVersion)
    }
  }, [selectedVersion, platform.versions])

  const handleVersionChange = (e) => {
    const newVersion = e.target.value
    setCurrentVersion(newVersion)
    onVersionChange?.(platform.id, newVersion)
  }

  // Get current version data or platform root
  const versionData = hasVersions
    ? platform.versions[currentVersion]
    : platform

  const compatibility = versionData?.compatibility || platform.compatibility
  const experimentalUrl = versionData?.experimental || platform.experimental

  // Build stable URL key (e.g., "sponge7" for API 7, "fabric1211" for 1.21.1)
  let stableKey = platform.id
  if (hasVersions && currentVersion) {
    // Convert version labels to match GitHub release parsing
    // api7 -> sponge7, 1.21.1 -> fabric1211
    if (currentVersion.startsWith('api')) {
      stableKey = `${platform.id}${currentVersion.replace('api', '')}`
    } else {
      stableKey = `${platform.id}${currentVersion.replace(/\./g, '')}`
    }
  }
  const stableUrl = stableUrls[stableKey] || stableUrls[platform.id]

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center h-full">
      {/* Platform Icon */}
      <div className="w-16 h-16 mb-4 relative">
        <Image
          src={platform.icon}
          alt={`${platform.name} logo`}
          width={64}
          height={64}
          className="object-contain"
        />
      </div>

      {/* Platform Name */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">{platform.name}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-2">{platform.description}</p>

      {/* Compatibility Badge */}
      {compatibility && (
        <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full mb-4">
          {compatibility}
        </span>
      )}

      {/* Version Dropdown */}
      {hasVersions && (
        <div className="w-full mb-4">
          <label htmlFor={`version-${platform.id}`} className="sr-only">
            Select version for {platform.name}
          </label>
          <select
            id={`version-${platform.id}`}
            value={currentVersion}
            onChange={handleVersionChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {versionKeys.map((key) => (
              <option key={key} value={key}>
                {platform.versions[key].label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Download Buttons - min-h ensures consistent card heights */}
      <div className="mt-auto w-full space-y-2 min-h-[88px] flex flex-col justify-end">
        {snapshotOnly
          ? (
          /* Snapshot-only: single download button for experimental URL */
          experimentalUrl && (
            <a
              href={experimentalUrl}
              className={clsx(
                'w-full py-2.5 px-4 rounded-lg font-medium text-sm inline-flex items-center justify-center gap-2 transition-colors',
                'bg-primary-500 text-white hover:bg-primary-700',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
              )}
              aria-label={`Download ${platform.name}`}
            >
              <FaDownload className="w-4 h-4" />
              Download
            </a>
          )
            )
          : (
          /* Regular product: stable + experimental buttons */
          <>
            {stableUrl
              ? (
              <a
                href={stableUrl}
                className={clsx(
                  'w-full py-2.5 px-4 rounded-lg font-medium text-sm inline-flex items-center justify-center gap-2 transition-colors',
                  'bg-primary-500 text-white hover:bg-primary-700',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
                )}
                aria-label={`Download stable ${platform.name}`}
              >
                <FaDownload className="w-4 h-4" />
                Download
              </a>
                )
              : (
              <button
                disabled
                className="w-full py-2.5 px-4 rounded-lg font-medium text-sm inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-500 cursor-not-allowed"
                aria-label="Stable version not yet available"
              >
                <FaDownload className="w-4 h-4" />
                Not yet available
              </button>
                )}

            {experimentalUrl && (
              <a
                href={experimentalUrl}
                className={clsx(
                  'w-full py-2.5 px-4 rounded-lg font-medium text-sm inline-flex items-center justify-center gap-2 transition-colors',
                  'border border-gray-300 text-gray-700 hover:bg-gray-100',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
                )}
                title="Latest CI build - may be unstable"
                aria-label={`Download experimental ${platform.name} build`}
              >
                <FaFlask className="w-4 h-4" />
                Experimental
              </a>
            )}
          </>
            )}
      </div>
    </div>
  )
}

PlatformCard.propTypes = {
  platform: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    compatibility: PropTypes.string,
    experimental: PropTypes.string,
    versions: PropTypes.objectOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        compatibility: PropTypes.string,
        experimental: PropTypes.string
      })
    )
  }).isRequired,
  stableUrls: PropTypes.objectOf(PropTypes.string),
  selectedVersion: PropTypes.string,
  onVersionChange: PropTypes.func,
  snapshotOnly: PropTypes.bool
}
