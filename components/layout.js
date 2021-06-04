import PropTypes from 'prop-types'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Nav } from './nav'
import { Footer } from './footer'

export const Layout = ({ title, description, children }) => {
  const router = useRouter()

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
      <div className="flex flex-col h-screen">
        <Nav />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired
}
