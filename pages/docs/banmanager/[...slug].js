import PropTypes from 'prop-types'
import { MDXRemote } from 'next-mdx-remote'
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

export default function BanManagerDocPage ({ source, frontMatter, toc, scope }) {
  return (
    <DocsLayout frontMatter={frontMatter} toc={toc}>
      <MDXRemote {...source} components={components} scope={scope} />
    </DocsLayout>
  )
}

BanManagerDocPage.propTypes = {
  source: PropTypes.object.isRequired,
  frontMatter: PropTypes.object.isRequired,
  toc: PropTypes.array.isRequired,
  scope: PropTypes.object
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
      scope: returnedScope
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
