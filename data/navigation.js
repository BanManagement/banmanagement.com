import { FaDownload, FaBook, FaQuestion } from 'react-icons/fa'
import { frontMatter } from '../pages/docs/**/*.mdx'

export const topLevelNav = [
  { href: '/download', label: 'Download', icon: <FaDownload className="flex-shrink-0 h-6 w-6 text-gray-900 inline mr-3" /> },
  { href: '/docs', label: 'Docs', icon: <FaBook className="flex-shrink-0 h-6 w-6 text-gray-900 inline mr-3" /> },
  { href: '/support', label: 'Support', icon: <FaQuestion className="flex-shrink-0 h-6 w-6 text-gray-900 inline mr-3" /> }
]

function generateDocsNav () {
  const categoryOrder = [
    'Getting Started',
    'Usage',
    'Migration Guides',
    'Developers',
    'Web UI'
  ]
  const navData = {}

  frontMatter.filter(({ navTitle, category }) => !!navTitle && !!category).forEach((page) => {
    if (!navData[page.category]) navData[page.category] = []

    navData[page.category].push(page)
  })

  return categoryOrder.reduce((r, k) => {
    r[k] = navData[k]

    return r
  }, {})
}

export const docsNav = generateDocsNav()
export const formatPath = (p) => '/' + p.replace(/\.mdx$/, '').replace(/\/index$/, '')
export const pages = frontMatter
