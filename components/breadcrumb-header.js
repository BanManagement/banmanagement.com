import { Fragment } from 'react'
import PropTypes from 'prop-types'

export const BreadcrumbHeader = ({ children, breadcrumbs }) => (
  <div className="py-8 bg-primary-600">
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <ol className="text-xl leading-7 text-gray-300 sm:text-xl sm:truncate" itemScope itemType="https://schema.org/BreadcrumbList">
        {breadcrumbs.map(([title, href], index) => (
          <Fragment key={title}>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className={`inline ${index !== breadcrumbs.length - 1 ? 'text-gray-500' : ''}`}
            >
              {href
                ? <a itemProp="item" href={href} className="hover:text-gray-100"><span itemProp="name">{title}</span></a>
                : <span itemProp="name">{title}</span>
              }
              <meta itemProp="position" content={index + 1} />
            </li>
            {index !== breadcrumbs.length - 1 && ' / '}
          </Fragment>
        ))}
      </ol>
      {children}
    </div>
  </div>
)

BreadcrumbHeader.propTypes = {
  children: PropTypes.node,
  breadcrumbs: PropTypes.array
}
