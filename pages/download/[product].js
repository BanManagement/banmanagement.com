import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Layout } from 'components/layout'
import { PageHeader } from 'components/page-header'
import { ProductSelector } from 'components/pages/download/product-selector'
import { PlatformCard } from 'components/pages/download/platform-card'
import { ChangelogDrawer } from 'components/pages/download/changelog-drawer'
import { DependencyBanner } from 'components/pages/download/dependency-banner'
import { fetchLatestRelease, parseReleaseBody } from 'lib/github'
import { formatDistanceToNowStrict } from 'date-fns'
import { FaFileAlt, FaDesktop, FaCog, FaFlask, FaCheck, FaSearch, FaGavel, FaUserShield, FaChartBar, FaMobileAlt, FaServer, FaKey } from 'react-icons/fa'
import Image from 'next/image'
import { DEMO } from 'constants/urls'
import downloadsData from 'data/downloads.json'

// Feature card component for Web UI
function FeatureCard ({ icon: Icon, title, description }) {
  return (
    <div className="group p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all">
      <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

FeatureCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export async function getStaticPaths () {
  return {
    paths: [
      { params: { product: 'banmanager' } },
      { params: { product: 'webenhancer' } },
      { params: { product: 'webui' } }
    ],
    fallback: false
  }
}

export async function getStaticProps ({ params }) {
  const { product } = params
  const productData = downloadsData[product]

  if (!productData) {
    return { notFound: true }
  }

  let release = null

  // Fetch release info for products with repos (skip for snapshot-only products)
  if (productData.repo && !productData.snapshotOnly) {
    const releaseData = await fetchLatestRelease(productData.repo)
    if (releaseData) {
      const { changelog, downloadUrls } = parseReleaseBody(releaseData.body)
      release = {
        version: releaseData.tag_name,
        publishedAt: releaseData.published_at,
        changelog,
        downloadUrls
      }
    }
  }

  return {
    props: {
      product,
      productData,
      release
    },
    revalidate: 3600 // Cache for an hour
  }
}

function DownloadProductPage ({ product, productData, release }) {
  const router = useRouter()
  const [isChangelogOpen, setIsChangelogOpen] = useState(false)
  const [selectedVersions, setSelectedVersions] = useState({})

  // Handle query params for deep-linking
  useEffect(() => {
    if (router.isReady) {
      const { platform, version } = router.query
      if (platform && version && productData.platforms?.[platform]) {
        setSelectedVersions((prev) => ({
          ...prev,
          [platform]: version
        }))
      }
    }
  }, [router.isReady, router.query, productData.platforms])

  const handleVersionChange = (platformId, version) => {
    setSelectedVersions((prev) => ({
      ...prev,
      [platformId]: version
    }))

    // Update URL with query params
    const query = { ...router.query, platform: platformId, version }
    router.replace({ pathname: router.pathname, query }, undefined, {
      shallow: true
    })
  }

  // Prepare platforms array with IDs
  const platforms = productData.platforms
    ? Object.entries(productData.platforms).map(([id, data]) => ({
        id,
        ...data
      }))
    : []

  const hasRelease = release?.version
  const timeAgo = release?.publishedAt
    ? formatDistanceToNowStrict(new Date(release.publishedAt)) + ' ago'
    : null

  // Special handling for Web UI (no downloadable plugin)
  const isWebUI = product === 'webui'

  return (
    <Layout
      title={`Download ${productData.name}`}
      description={`Download ${productData.name} for your Minecraft server. ${productData.description}`}
    >
      <PageHeader>Download</PageHeader>

      {/* Main Content */}
      <div className="bg-white pb-12">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Product Selector */}
          <ProductSelector activeProduct={product} />

          {/* Product Header */}
          <div className="text-center py-8 border-b border-gray-200 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {productData.name}
            </h2>
            <p className="text-gray-600 mb-4">{productData.description}</p>

            {/* Version and Release Notes */}
            {hasRelease && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                  {release.version}
                </span>
                {timeAgo && (
                  <span className="text-gray-500 text-sm">
                    Released {timeAgo}
                  </span>
                )}
                <button
                  onClick={() => setIsChangelogOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium text-primary-600 hover:text-primary-800 hover:bg-primary-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <FaFileAlt className="w-4 h-4" />
                  View Release Notes
                </button>
              </div>
            )}

            {/* Snapshot-only notice */}
            {productData.snapshotOnly && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                  <FaFlask className="w-3 h-3" />
                  Development Builds
                </span>
                {productData.ciUrl && (
                  <a
                    href={productData.ciUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 text-sm hover:text-gray-700 underline"
                  >
                    View build history
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Dependency Banner */}
          <DependencyBanner
            requires={productData.requires}
            requiresDatabase={productData.requiresDatabase}
            installUrl={productData.installUrl}
          />

          {/* Web UI Special Case */}
          {isWebUI
            ? (
            <div className="space-y-12">
              {/* Hero Screenshot Gallery */}
              {productData.screenshots && productData.screenshots.length > 0 && (
                <div className="grid lg:grid-cols-2 gap-6">
                  {productData.screenshots.map((screenshot, index) => (
                    <div
                      key={index}
                      className="group relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/10"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        width={800}
                        height={450}
                        className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                      />
                      {screenshot.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                          <p className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            {screenshot.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Feature Cards Grid */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                  Everything you need to manage your community
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Row 1: Core Functionality */}
                  <FeatureCard
                    icon={FaSearch}
                    title="Player Lookup"
                    description="Find any player and view their full punishment record"
                  />
                  <FeatureCard
                    icon={FaGavel}
                    title="Ban Appeals"
                    description="Players submit appeals, staff review and respond"
                  />
                  <FeatureCard
                    icon={FaChartBar}
                    title="Live Dashboard"
                    description="Server-wide stats for bans, mutes, warnings and players"
                  />
                  <FeatureCard
                    icon={FaServer}
                    title="Multi-Server"
                    description="One dashboard to manage all your connected servers"
                  />
                  {/* Row 2: Access & Platform */}
                  <FeatureCard
                    icon={FaKey}
                    title="In-Game Login"
                    description="Players authenticate with a unique pin from in-game"
                  />
                  <FeatureCard
                    icon={FaUserShield}
                    title="Staff Roles"
                    description="Granular permissions control who can view and act"
                  />
                  <FeatureCard
                    icon={FaMobileAlt}
                    title="Mobile Ready"
                    description="Fully responsive - works on phones and tablets"
                  />
                  <FeatureCard
                    icon={FaFileAlt}
                    title="Public Access"
                    description="Let players check their own history without login"
                  />
                </div>
              </div>

              {/* CTA Section */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-8 sm:p-12">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10" />
                <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Ready to get started?
                    </h3>
                    <p className="text-primary-100">
                      Follow our installation guide to set up your Web UI in minutes.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={productData.installUrl}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-primary-700 bg-white hover:bg-primary-50 transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <FaCog className="w-4 h-4" />
                      Install Now
                    </Link>
                    <a
                      href={DEMO}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white border-2 border-white/30 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <FaDesktop className="w-4 h-4" />
                      Try Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
              )
            : (
            /* Platform Grid */
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {platforms.map((platform) => (
                <PlatformCard
                  key={platform.id}
                  platform={platform}
                  stableUrls={release?.downloadUrls || {}}
                  selectedVersion={selectedVersions[platform.id]}
                  onVersionChange={handleVersionChange}
                  snapshotOnly={productData.snapshotOnly}
                />
              ))}
            </div>
              )}
        </div>
      </div>

      {/* Changelog Drawer */}
      <ChangelogDrawer
        isOpen={isChangelogOpen}
        onClose={() => setIsChangelogOpen(false)}
        version={release?.version}
        publishedAt={release?.publishedAt}
        changelog={release?.changelog || []}
      />
    </Layout>
  )
}

DownloadProductPage.propTypes = {
  product: PropTypes.string.isRequired,
  productData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    repo: PropTypes.string,
    requires: PropTypes.arrayOf(PropTypes.string),
    requiresDatabase: PropTypes.string,
    installUrl: PropTypes.string,
    demoUrl: PropTypes.string,
    platforms: PropTypes.object,
    snapshotOnly: PropTypes.bool,
    ciUrl: PropTypes.string,
    screenshots: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        caption: PropTypes.string
      })
    ),
    features: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  release: PropTypes.shape({
    version: PropTypes.string,
    publishedAt: PropTypes.string,
    changelog: PropTypes.arrayOf(PropTypes.string),
    downloadUrls: PropTypes.object
  })
}

export default DownloadProductPage
