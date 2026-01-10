const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const glob = require('fast-glob')

const CONTENT_PATH = path.join(process.cwd(), 'content/docs')

/**
 * Get a single document by its slug
 * @param {string} slug - The document slug (e.g., 'banmanager/install')
 * @param {object} options - Additional options like scope for variables
 * @returns {Promise<{source: object, frontMatter: object, toc: array}>}
 */
async function getDocBySlug (slug, options = {}) {
  // Dynamic imports for ESM-only packages
  const { serialize } = await import('next-mdx-remote/serialize')
  const GithubSlugger = (await import('github-slugger')).default
  const { toString } = await import('mdast-util-to-string')
  const { visit } = await import('unist-util-visit')
  const rehypeHighlight = (await import('rehype-highlight')).default
  const rehypeAutolinkHeadings = (await import('rehype-autolink-headings')).default
  const remarkGfm = (await import('remark-gfm')).default

  // Handle index files
  let filePath = path.join(CONTENT_PATH, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) {
    filePath = path.join(CONTENT_PATH, slug, 'index.mdx')
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`Document not found: ${slug}`)
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { content, data: frontMatter } = matter(fileContents)

  // Remove import/export statements from content (they're not supported by next-mdx-remote)
  const cleanedContent = content
    .replace(/^import\s+.*?['"].*?['"]\s*;?\s*$/gm, '')
    .replace(/^export\s+\{[^}]*\}\s+from\s+['"].*?['"]\s*;?\s*$/gm, '')

  // Create TOC extraction plugin
  let extractedToc = []

  function remarkHeadingsWithToc () {
    return (tree) => {
      const slugger = new GithubSlugger()
      const toc = []
      const stack = [{ children: toc }]

      visit(tree, 'heading', (node) => {
        const data = node.data || (node.data = {})
        const properties = data.hProperties || (data.hProperties = {})

        // Get heading text
        const headingTextNodes = node.children.filter(
          ({ type }) => !['html', 'jsx', 'mdxJsxFlowElement', 'mdxJsxTextElement'].includes(type)
        )
        const headingText = toString(
          headingTextNodes.length > 0 ? { children: headingTextNodes } : node
        )

        // Support explicit heading IDs like ## Heading {#custom-id}
        const explicitIdMatch = headingText.match(/^(.+?)\s*\{#([^}]+)\}\s*$/)
        let id, text
        if (explicitIdMatch) {
          text = explicitIdMatch[1].trim()
          id = slugger.slug(explicitIdMatch[2], true)
          // Remove the {#id} from the heading text
          if (node.children.length > 0) {
            const lastChild = node.children[node.children.length - 1]
            if (lastChild.value) {
              lastChild.value = lastChild.value.replace(/\s*\{#[^}]+\}\s*$/, '')
            }
          }
        } else {
          text = headingText
          id = slugger.slug(headingText)
        }

        // Remove characters after --- to support config headings (existing behavior)
        id = id.split('---')[0]

        // Set heading ID
        data.id = id
        properties.id = id

        // Build TOC structure for h2 and h3 only
        if (node.depth === 2 || node.depth === 3) {
          const tocItem = {
            id,
            value: text,
            children: []
          }

          if (node.depth === 2) {
            // Reset stack to root level for h2
            while (stack.length > 1) stack.pop()
            stack[0].children.push(tocItem)
            stack.push(tocItem)
          } else if (node.depth === 3 && stack.length > 1) {
            // Add h3 as child of last h2
            stack[stack.length - 1].children.push(tocItem)
          }
        }
      })

      extractedToc = toc
    }
  }

  const mdxSource = await serialize(cleanedContent, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkHeadingsWithToc
      ],
      rehypePlugins: [
        rehypeHighlight,
        [rehypeAutolinkHeadings, {
          properties: {
            ariaHidden: true,
            tabIndex: -1,
            class: 'heading-link'
          }
        }]
      ],
      development: process.env.NODE_ENV === 'development'
    },
    scope: options.scope || {}
  })

  // Get the relative path from content directory for __resourcePath
  // Normalize to forward slashes for cross-platform consistency
  const relativePath = path.relative(CONTENT_PATH, filePath).replace(/\\/g, '/')
  const resourcePath = `docs/${relativePath}`

  return {
    source: mdxSource,
    frontMatter: {
      ...frontMatter,
      __resourcePath: resourcePath
    },
    toc: extractedToc,
    scope: options.scope || {}
  }
}

/**
 * Get all document slugs for getStaticPaths
 * @param {string} prefix - Optional prefix to filter by (e.g., 'banmanager')
 * @returns {Promise<string[]>}
 */
async function getAllDocSlugs (prefix = '') {
  const searchPath = prefix
    ? path.join(CONTENT_PATH, prefix)
    : CONTENT_PATH

  if (!fs.existsSync(searchPath)) {
    return []
  }

  const files = await glob('**/*.mdx', { cwd: searchPath })

  return files.map((file) => {
    // Remove .mdx extension
    let slug = file.replace(/\.mdx$/, '')
    // Handle index files - configuration/index -> configuration
    if (slug.endsWith('/index')) {
      slug = slug.slice(0, -6)
    } else if (slug === 'index') {
      slug = ''
    }
    return slug
  }).filter(Boolean) // Remove empty strings
}

/**
 * Get front matter from all documents for navigation
 * @returns {Promise<array>}
 */
async function getAllDocsFrontMatter () {
  const files = await glob('**/*.mdx', { cwd: CONTENT_PATH })

  const frontMatters = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(CONTENT_PATH, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        ...data,
        __resourcePath: `docs/${file}`
      }
    })
  )

  return frontMatters
}

/**
 * Special data fetchers for specific pages
 */
const pageScopeLoaders = {
  'banmanager/api': async () => {
    // Fetch version data from GitHub
    const res = await fetch('https://raw.githubusercontent.com/BanManagement/BanManager/refs/heads/master/gradle.properties')
    const text = await res.text()
    const versionMatch = text.match(/version=(.*)/)
    const version = versionMatch ? versionMatch[1] : null

    const versions = {
      bukkit: version,
      bungeecord: version,
      common: version,
      fabric: version,
      sponge: version,
      velocity: version
    }

    // Fetch events list
    const eventsRes = await fetch('https://api.github.com/repos/BanManagement/BanManager/contents/bukkit/src/main/java/me/confuser/banmanager/bukkit/api/events')
    const eventsJson = await eventsRes.json()
    let events = []
    if (Array.isArray(eventsJson)) {
      events = eventsJson
        .map(a => a.name.replace('.java', ''))
        .filter(a => !(a.includes('Custom') || a.includes('Silent')))
    }

    return { versions, events }
  }
}

/**
 * Get scope data for a specific slug (for pages with dynamic data)
 * @param {string} slug
 * @returns {Promise<object>}
 */
async function getScopeForSlug (slug) {
  const loader = pageScopeLoaders[slug]
  if (loader) {
    return await loader()
  }
  return {}
}

module.exports = {
  getDocBySlug,
  getAllDocSlugs,
  getAllDocsFrontMatter,
  getScopeForSlug
}
