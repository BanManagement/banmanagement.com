import { FaDownload, FaBook, FaQuestion } from 'react-icons/fa'
import navigationData from './navigation.json'

export const topLevelNav = [
  { href: '/download', label: 'Download', icon: <FaDownload className="flex-shrink-0 h-6 w-6 text-gray-900 inline mr-3" /> },
  { href: '/docs', label: 'Docs', icon: <FaBook className="flex-shrink-0 h-6 w-6 text-gray-900 inline mr-3" /> },
  { href: '/support', label: 'Support', icon: <FaQuestion className="flex-shrink-0 h-6 w-6 text-gray-900 inline mr-3" /> }
]

export const docsNav = navigationData.docsNav || {}
export const formatPath = (p) => '/' + p.replace(/\.mdx$/, '').replace(/\/index$/, '')
export const pages = navigationData.pages || []
