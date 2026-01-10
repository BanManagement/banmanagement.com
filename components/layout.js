import PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Nav } from './nav'
import { Footer } from './footer'

export const Layout = ({ title, description, children }) => {
  const router = useRouter()

  const origin = 'https://banmanagement.com'
  // Strip query strings from canonical URL to avoid duplicate content issues
  const pathname = router.asPath.split('?')[0]
  let url = `${origin}${pathname}`

  if (url.length === (origin.length + 1)) url = origin

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
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
