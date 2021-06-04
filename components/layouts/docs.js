import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import GithubSlugger from 'github-slugger'
import { FaEdit } from 'react-icons/fa'
import { Layout } from 'components/layout'
import { BreadcrumbHeader } from 'components/breadcrumb-header'
import TOC from 'components/toc'
import { GITHUB_ORG } from 'constants/urls'
import { docsNav, formatPath, pages } from 'data/navigation'

const slugger = new GithubSlugger()

function DocsLayout ({ children, frontMatter, toc }) {
  const router = useRouter()
  const nav = Object.entries(docsNav).map(([category, pages]) => (
    <Fragment key={category}>
      <h4 className="px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900">{category}</h4>
      <ul className="text-sm mb-8">
        {pages.map((page) => (
          <li key={page.__resourcePath} className="py-1">
            <a className={`px-3 py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 ${router.asPath === formatPath(page.__resourcePath) ? 'font-bold' : ''}`} href={formatPath(page.__resourcePath)}>{page.navTitle}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  ))
  const headingId = slugger.slug(frontMatter.title)
  const breadcrumbs = [['Docs', '/docs']]
  let title = frontMatter.title

  if (router.asPath) {
    if (router.asPath.startsWith('/docs/banmanager')) {
      breadcrumbs.push(['BanManager', ''])

      title = `${title} | BanManager`
    } else if (router.asPath.startsWith('/docs/webui')) {
      breadcrumbs.push(['WebUI', ''])
      title = `${title} | WebUI`
    }

    router.asPath.split('/').forEach((path, index, totalPath) => {
      const currentPath = totalPath.slice(0, index).join('/')
      const page = pages.find(p => formatPath(p.__resourcePath) === currentPath)

      if (page && page.navTitle) {
        breadcrumbs.push([page.navTitle, formatPath(page.__resourcePath)])
      }
    })

    breadcrumbs.push([frontMatter.navTitle || frontMatter.title, router.asPath])
  }

  return (
    <Layout title={title} description={frontMatter.description}>
      <BreadcrumbHeader breadcrumbs={breadcrumbs} />
      <div className="w-full max-w-8xl mx-auto">
        <div className="lg:flex">
          <div className="pt-8 pb-12 hidden w-full lg:block lg:w-60 xl:w-72">
            <div className="pl-5 top-5 overflow-y-auto sticky?lg:h-(screen-18)">
              {nav}
            </div>
          </div>
          <div className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
            <div className="w-full flex">
              <article className="prose max-w-none min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
                <h1 id={headingId}>
                  <a aria-hidden="true" tabIndex="-1" href={`#${headingId}`} className="heading-link"><span className="icon icon-link"></span></a>
                  {frontMatter.title}
                </h1>
                {children}
                <div className="mt-12 border-t border-gray-200 pt-6 text-right">
                  <a
                    href={`${GITHUB_ORG}/banmanagement.com/edit/master/pages/${frontMatter.__resourcePath}`}
                    target='_blank'
                    rel='noreferrer noopener'
                    className="mt-10 text-sm hover:text-gray-900"
                  >
                    <FaEdit className="inline mx-auto mr-2" />Edit this page on GitHub
                  </a>
                </div>
              </article>
              <div className="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8">
                <div className="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-5) pt-10 pb-6 top-5">
                  <div className="mb-8">
                    <h5 className="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs">On this page</h5>
                    <a href={`#${headingId}`}
                      className="block transform transition-colors duration-200 py-2 hover:text-gray-900 text-gray-500 toc-link"
                    >
                      {frontMatter.title}
                    </a>
                    <TOC toc={toc} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

DocsLayout.propTypes = {
  children: PropTypes.node,
  frontMatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    navTitle: PropTypes.string,
    __resourcePath: PropTypes.string.isRequired
  }),
  toc: PropTypes.array
}

export default DocsLayout
