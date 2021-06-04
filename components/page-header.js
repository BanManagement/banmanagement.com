import PropTypes from 'prop-types'

export const PageHeader = ({ children }) => (
  <div className="py-12 bg-gray-50">
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
        {children}
      </h2>
    </div>
  </div>
)

PageHeader.propTypes = {
  children: PropTypes.node.isRequired
}
