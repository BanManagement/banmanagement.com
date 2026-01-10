import PropTypes from 'prop-types'
import Link from 'next/link'
import clsx from 'clsx'

const products = [
  { id: 'banmanager', name: 'BanManager', href: '/download/banmanager' },
  { id: 'webenhancer', name: 'WebEnhancer', href: '/download/webenhancer' },
  { id: 'webui', name: 'Web UI', href: '/download/webui' }
]

export const ProductSelector = ({ activeProduct }) => (
  <nav
    className="flex gap-2 overflow-x-auto py-6 -webkit-overflow-scrolling-touch justify-center"
    role="tablist"
    aria-label="Product selection"
  >
    {products.map((product) => {
      const isActive = product.id === activeProduct
      return (
        <Link
          key={product.id}
          href={product.href}
          role="tab"
          aria-selected={isActive}
          aria-current={isActive ? 'page' : undefined}
          className={clsx(
            'px-5 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-colors border',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
            {
              'bg-primary-500 text-white border-primary-500 shadow-md': isActive,
              'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400': !isActive
            }
          )}
        >
          {product.name}
        </Link>
      )
    })}
  </nav>
)

ProductSelector.propTypes = {
  activeProduct: PropTypes.oneOf(['banmanager', 'webenhancer', 'webui']).isRequired
}
