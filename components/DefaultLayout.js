import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { withRouter } from 'next/router'
import Footer from './Footer'
import ResponsiveContainer from '../components/ResponsiveContainer'
import 'semantic-ui-css/semantic.min.css'

class DefaultLayout extends React.Component {
  static defaultProps =
    { title: 'Default Title',
      rightItems: [
        { name: 'Demo', href: 'https://demo.banmanagement.com' },
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
    children: PropTypes.node.isRequired,
    heading: PropTypes.func
  }

  render () {
    const { title, children, heading } = this.props
    let { leftItems, rightItems } = this.props

    return (
      <React.Fragment>
        <Head>
          <title>{ title }</title>
        </Head>
        <ResponsiveContainer heading={heading} leftItems={leftItems} rightItems={rightItems}>
          {children}
          <Footer />
        </ResponsiveContainer>
      </React.Fragment>
    )
  }
}

export default withRouter(DefaultLayout)
