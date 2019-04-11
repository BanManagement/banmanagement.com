import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { withRouter } from 'next/router'
import Footer from './Footer'
import ResponsiveContainer from '../components/ResponsiveContainer'
import { getWidthFactory } from '../utils'

// Only import what we need
import 'semantic-ui-css/components/button.css'
import 'semantic-ui-css/components/container.css'
import 'semantic-ui-css/components/divider.css'
import 'semantic-ui-css/components/grid.css'
import 'semantic-ui-css/components/header.css'
import 'semantic-ui-css/components/icon.css'
import 'semantic-ui-css/components/image.css'
import 'semantic-ui-css/components/menu.css'
import 'semantic-ui-css/components/list.css'
import 'semantic-ui-css/components/reset.css'
import 'semantic-ui-css/components/segment.css'
import 'semantic-ui-css/components/sidebar.css'
import 'semantic-ui-css/components/site.css'

class DefaultLayout extends React.Component {
  static defaultProps =
    { title: 'Default Title',
      rightItems: [
        { name: 'Demo', href: 'https://demo.banmanagement.com', as: 'a' }, // work around DOMException
        { name: 'Source', href: 'https://github.com/BanManagement/BanManager-WebUI' }
      ],
      leftItems: [
        { name: 'Features', href: '/features' },
        { name: 'Setup', href: '/setup' },
        { name: 'Support', href: '/support' },
        { name: 'FAQ', href: '/faq' }
      ]
    }
  static propTypes = {
    title: PropTypes.string,
    router: PropTypes.object.isRequired,
    children: PropTypes.node,
    heading: PropTypes.func,
    isMobileFromSSR: PropTypes.bool.isRequired
  }

  render () {
    const { title, children, heading, isMobileFromSSR } = this.props
    let { leftItems, rightItems } = this.props

    return (
      <React.Fragment>
        <Head>
          <title>{ title }</title>
        </Head>
        <ResponsiveContainer heading={heading} leftItems={leftItems} rightItems={rightItems} getWidth={getWidthFactory(isMobileFromSSR)} mobile={isMobileFromSSR}>
          {children}
          <Footer />
        </ResponsiveContainer>
      </React.Fragment>
    )
  }
}

export default withRouter(DefaultLayout)
