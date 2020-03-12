import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { withRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import Footer from './Footer'
import ResponsiveContainer from '../components/ResponsiveContainer'
import { getWidthFactory } from '../utils'

class DefaultLayout extends React.Component {
  static defaultProps =
    {
      title: 'Default Title',
      rightItems: [
        { name: 'Demo', href: 'https://demo.banmanagement.com' }, // work around DOMException
        { name: 'Source', href: 'https://github.com/BanManagement/BanManager-WebUI' }
      ],
      leftItems: [
        { name: 'Features', href: '/features' },
        { name: 'Setup', href: '/setup' },
        { name: 'Support', href: '/support' },
        { name: 'Developers', href: '/developers' },
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
    const { title, children, heading, isMobileFromSSR, description, router } = this.props
    const { leftItems, rightItems } = this.props
    const origin = 'https://banmanagement.com'
    let url = `${origin}${router.asPath}`

    if (url.length === (origin.length + 1)) url = origin

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <NextSeo
          description={description} title={title} openGraph={{
            title,
            url,
            description
          }}
          canonical={url}
        />
        <ResponsiveContainer heading={heading} leftItems={leftItems} rightItems={rightItems} getWidth={getWidthFactory(isMobileFromSSR)} mobile={isMobileFromSSR}>
          <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              {children}
            </div>
            <Footer isMobileFromSSR={isMobileFromSSR} />
          </div>
        </ResponsiveContainer>
      </>
    )
  }
}

export default withRouter(DefaultLayout)
