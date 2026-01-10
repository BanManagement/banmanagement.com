import PropTypes from 'prop-types'
import { MDXRemote } from 'next-mdx-remote'
import { FAQPageJsonLd } from 'next-seo'
import DocsLayout from 'components/layouts/docs'

// Import all custom components that might be used in MDX
import { CommandsTable } from 'components/pages/docs/banmanager/commands/commands-table'
import { FlagsTable } from 'components/pages/docs/banmanager/commands/flags-table'
import { GlobalCommandsTable } from 'components/pages/docs/banmanager/commands/global-commands-table'
import { PermissionsTable } from 'components/pages/docs/banmanager/permissions/permissions-table'
import { PlaceholdersTable } from 'components/pages/docs/banmanager/placeholders/placeholders-table'
import { Message } from 'components/pages/docs/banmanager/configuration/message'
import { MigrationContentList } from 'components/pages/docs/banmanager/migrations/content-list'
import { Code } from 'components/code'

// Component registry for MDX
const components = {
  CommandsTable,
  FlagsTable,
  GlobalCommandsTable,
  PermissionsTable,
  PlaceholdersTable,
  Message,
  MigrationContentList,
  Code
}

// FAQ questions for structured data (extracted from FAQ page content)
const faqQuestions = [
  {
    questionName: 'BanManager is showing as red in /plugins',
    acceptedAnswerText: 'Please ensure you have configured the plugin correctly and check either your server log or console for more information.'
  },
  {
    questionName: 'When trying to /ban a player it displays /ban <player> <reason>',
    acceptedAnswerText: 'The plugin is not enabled, please check your server startup log for more information.'
  },
  {
    questionName: 'BanManager is unable to connect to the database',
    acceptedAnswerText: 'This can be caused by a number of issues. Verify you are using the correct address, port, username and password. Ensure the database exists and is accessible by the user. Check that no firewall rules are blocking the connection.'
  },
  {
    questionName: 'How can I add new lines to the player denied screen when a banned player tries to join?',
    acceptedAnswerText: String.raw`Use \n within the message in the messages.yml wherever you'd like a new line to start.`
  },
  {
    questionName: 'I punished a player but it doesn\'t appear to have synced across all servers',
    acceptedAnswerText: 'Each server polls for data changes including new punishments. Check your schedules.yml file and adjust timings. By default local punishments are checked every 30 seconds and global punishments every 2 minutes.'
  }
]

export default function BanManagerDocPage ({ source, frontMatter, toc, scope, isFaq }) {
  return (
    <DocsLayout frontMatter={frontMatter} toc={toc}>
      {isFaq && <FAQPageJsonLd mainEntity={faqQuestions} />}
      <MDXRemote {...source} components={components} scope={scope} />
    </DocsLayout>
  )
}

BanManagerDocPage.propTypes = {
  source: PropTypes.object.isRequired,
  frontMatter: PropTypes.object.isRequired,
  toc: PropTypes.array.isRequired,
  scope: PropTypes.object,
  isFaq: PropTypes.bool
}

export async function getStaticProps ({ params }) {
  // Dynamic import to avoid bundling fs/path for client
  const { getDocBySlug, getScopeForSlug } = require('lib/mdx')

  const slug = params.slug.join('/')
  const fullSlug = `banmanager/${slug}`

  // Get scope data for pages that need dynamic data (like api.mdx)
  const scope = await getScopeForSlug(fullSlug)

  const { source, frontMatter, toc, scope: returnedScope } = await getDocBySlug(fullSlug, { scope })

  return {
    props: {
      source,
      frontMatter,
      toc,
      scope: returnedScope,
      isFaq: slug === 'faq'
    },
    // Revalidate every 24 hours for pages with dynamic data
    revalidate: fullSlug === 'banmanager/api' ? 86400 : false
  }
}

export async function getStaticPaths () {
  // Dynamic import to avoid bundling fs/path for client
  const { getAllDocSlugs } = require('lib/mdx')

  const slugs = await getAllDocSlugs('banmanager')

  const paths = slugs.map((slug) => ({
    params: {
      slug: slug.split('/')
    }
  }))

  return {
    paths,
    fallback: false
  }
}
