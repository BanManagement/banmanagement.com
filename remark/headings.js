// Based on @docusaurus/mdx-loader/src/remark/headings
// Modified to handle .config-info ids and remove Docusaurus dependency
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* Based on remark-slug (https://github.com/remarkjs/remark-slug) */

const visit = require('unist-util-visit')
const toString = require('mdast-util-to-string')
const slugs = require('github-slugger')()

/**
 * Parse markdown heading ID from text like "Heading {#custom-id}"
 * @param {string} heading - The heading text
 * @returns {{ text: string, id: string | null }}
 */
function parseMarkdownHeadingId (heading) {
  const match = heading.match(/^(.+?)\s*\{#([^}]+)\}\s*$/)
  if (match) {
    return {
      text: match[1].trim(),
      id: match[2]
    }
  }
  return {
    text: heading,
    id: null
  }
}

function headings () {
  const transformer = (ast) => {
    slugs.reset()

    function visitor (headingNode) {
      const data = headingNode.data || (headingNode.data = {});  
      const properties = data.hProperties || (data.hProperties = {})
      let { id } = properties

      if (id) {
        id = slugs.slug(id, true)
      } else {
        const headingTextNodes = headingNode.children.filter(
          ({ type }) => !['html', 'jsx'].includes(type)
        )
        const heading = toString(
          headingTextNodes.length > 0
            ? { children: headingTextNodes }
            : headingNode
        )

        // Support explicit heading IDs
        const parsedHeading = parseMarkdownHeadingId(heading)

        id = parsedHeading.id || slugs.slug(heading)

        if (parsedHeading.id) {
          // When there's an id, it is always in the last child node
          // Sometimes heading is in multiple "parts" (** syntax creates a child node):
          // ## part1 *part2* part3 {#id}
          const lastNode =
            headingNode.children[headingNode.children.length - 1]

          if (headingNode.children.length > 1) {
            const lastNodeText = parseMarkdownHeadingId(lastNode.value).text
            // When last part contains test+id, remove the id
            if (lastNodeText) {
              lastNode.value = lastNodeText
            } else { // When last part contains only the id: completely remove that node
              headingNode.children.pop()
            }
          } else {
            lastNode.value = parsedHeading.text
          }
        }
      }

      // Remove characters after --- to support config headings
      id = id.split('---')[0]

      data.id = id
      properties.id = id
    }

    visit(ast, 'heading', visitor)
  }

  return transformer
}

module.exports = headings
