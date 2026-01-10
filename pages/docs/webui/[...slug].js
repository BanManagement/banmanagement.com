import PropTypes from 'prop-types'
import { MDXRemote } from 'next-mdx-remote'
import DocsLayout from 'components/layouts/docs'

export default function WebUIDocPage ({ source, frontMatter, toc }) {
  return (
    <DocsLayout frontMatter={frontMatter} toc={toc}>
      <MDXRemote {...source} />
    </DocsLayout>
  )
}

WebUIDocPage.propTypes = {
  source: PropTypes.object.isRequired,
  frontMatter: PropTypes.object.isRequired,
  toc: PropTypes.array.isRequired
}

export async function getStaticProps ({ params }) {
  // Dynamic import to avoid bundling fs/path for client
  const { getDocBySlug } = require('lib/mdx')

  const slug = params.slug.join('/')
  const fullSlug = `webui/${slug}`

  const { source, frontMatter, toc } = await getDocBySlug(fullSlug)

  return {
    props: {
      source,
      frontMatter,
      toc
    }
  }
}

export async function getStaticPaths () {
  // Dynamic import to avoid bundling fs/path for client
  const { getAllDocSlugs } = require('lib/mdx')

  const slugs = await getAllDocSlugs('webui')

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
