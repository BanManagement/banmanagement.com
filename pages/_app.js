import 'regenerator-runtime/runtime'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import '../styles/index.css'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='apple-touch-icon' sizes='76x76' href='/images/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/images/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/images/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/images/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#0F0E0D' />
        <meta name='theme-color' content='#0F0E0D' />
      </Head>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_UK',
          url: 'https://banmanagement.com/',
          site_name: 'Ban Management'
        }}
        titleTemplate='%s | Ban Management'
      />
      <Component {...pageProps} />
    </>
  )
}

MyApp.propTypes = {
  pageProps: PropTypes.object,
  Component: PropTypes.elementType
}

export default MyApp
