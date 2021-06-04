const withTM = require('next-transpile-modules')(['minecraft-text'])
const withMdxEnhanced = require('next-mdx-enhanced')
const autoLinkHeadings = require('rehype-autolink-headings')
const highlight = require('rehype-highlight')
const headings = require('./remark/headings')
const toc = require('@docusaurus/mdx-loader/src/remark/toc')

module.exports = withTM(withMdxEnhanced({
  layoutPath: 'components/layouts',
  defaultLayout: false,
  fileExtensions: ['mdx'],
  remarkPlugins: [headings, toc],
  rehypePlugins: [[autoLinkHeadings, { properties: { ariaHidden: true, tabIndex: -1, class: 'heading-link' } }], highlight],
  usesSrc: false,
  extendFrontMatter: {
    process: (mdxContent, frontMatter) => {},
    phase: 'prebuild|loader|both'
  },
  reExportDataFetching: false
})({
  async redirects () {
    return [
      {
        source: '/faq',
        destination: '/docs/banmanager/faq',
        permanent: true
      },
      {
        source: '/developers',
        destination: '/docs/banmanager/api',
        permanent: true
      },
      {
        source: '/setup',
        destination: '/docs',
        permanent: true
      },
      {
        source: '/setup/migration/advancedban',
        destination: '/docs/banmanager/migrations/advancedban',
        permanent: true
      },
      {
        source: '/setup/migration/vanilla',
        destination: '/docs/banmanager/migrations/minecraft-java-edition',
        permanent: true
      },
      {
        source: '/setup/migration/h2',
        destination: '/docs/banmanager/migrations/h2',
        permanent: true
      },
      {
        source: '/setup/minecraft-server',
        destination: '/docs/banmanager/install',
        permanent: true
      },
      {
        source: '/setup/commands-permissions',
        destination: '/docs/banmanager/commands',
        permanent: true
      },
      {
        source: '/setup/web-application',
        destination: '/docs/webui/install',
        permanent: true
      },
      {
        source: '/setup/sync/all',
        destination: '/docs/banmanager/install-network',
        permanent: true
      },
      {
        source: '/setup/sync/individual',
        destination: '/docs/banmanager/install-network',
        permanent: true
      },
      {
        source: '/setup/sync/mixed',
        destination: '/docs/banmanager/install-network',
        permanent: true
      }
    ]
  }
}))
