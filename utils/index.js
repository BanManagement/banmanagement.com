import { Responsive } from 'semantic-ui-react'
import MobileDetect from 'mobile-detect'

const getWidthFactory = isMobileFromSSR => () => {
  const isSSR = typeof window === 'undefined'
  const ssrValue = isMobileFromSSR
    ? Responsive.onlyMobile.maxWidth
    : Responsive.onlyTablet.minWidth

  return isSSR ? ssrValue : window.innerWidth
}

const getInitialProps = async ({ req }) => {
  if (!req) return { isMobileFromSSR: false }

  const md = new MobileDetect(req.headers['user-agent'])
  const isMobileFromSSR = !!md.mobile()

  return {
    isMobileFromSSR,
    deviceInfo: {
      mobile: md.mobile(),
      tablet: md.tablet(),
      os: md.os(),
      userAgent: md.userAgent()
    }
  }
}

export { getWidthFactory, getInitialProps }
