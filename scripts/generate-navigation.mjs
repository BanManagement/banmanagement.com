#!/usr/bin/env node
/**
 * Script to generate navigation.json from MDX front matter
 * Run with: node scripts/generate-navigation.mjs
 * Or add to package.json: "prebuild": "node scripts/generate-navigation.mjs"
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CONTENT_PATH = path.join(__dirname, '../content/docs')
const OUTPUT_PATH = path.join(__dirname, '../data/navigation.json')

function generateNavigation () {
  // Check if content directory exists
  if (!fs.existsSync(CONTENT_PATH)) {
    console.warn('Warning: content/docs directory does not exist yet. Creating empty navigation.')
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify({ pages: [], docsNav: {} }, null, 2))
    return
  }

  const files = fg.sync('**/*.mdx', { cwd: CONTENT_PATH })

  const pages = files.map((file) => {
    const filePath = path.join(CONTENT_PATH, file)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    return {
      ...data,
      __resourcePath: `docs/${file}`
    }
  })

  // Generate navigation structure
  const categoryOrder = [
    'Getting Started',
    'Usage',
    'Migration Guides',
    'Developers',
    'Web UI'
  ]

  const navData = {}

  pages
    .filter(({ navTitle, category }) => !!navTitle && !!category)
    .forEach((page) => {
      if (!navData[page.category]) navData[page.category] = []
      navData[page.category].push(page)
    })

  // Sort by category order
  const docsNav = categoryOrder.reduce((r, k) => {
    if (navData[k]) {
      r[k] = navData[k]
    }
    return r
  }, {})

  const output = {
    pages,
    docsNav
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2))
  console.log(`Generated navigation.json with ${pages.length} pages`)
}

generateNavigation()
