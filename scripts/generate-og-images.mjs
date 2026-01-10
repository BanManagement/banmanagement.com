import fs from 'node:fs/promises'
import path from 'node:path'
import satori from 'satori'
import sharp from 'sharp'

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname)
const outRoot = path.join(repoRoot, 'public', 'images', 'og')

// Fetch Inter font from Google Fonts
async function fetchFont (weight) {
  const API = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`

  const css = await fetch(API, {
    headers: {
      // Make sure we get TTF format
      'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1'
    }
  }).then(res => res.text())

  const resource = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)

  if (!resource) {
    throw new Error('Failed to parse font URL from Google Fonts CSS')
  }

  const fontData = await fetch(resource[1]).then(res => res.arrayBuffer())
  return fontData
}

// Read the BanManager icon
async function loadIcon () {
  const iconPath = path.join(repoRoot, 'public', 'images', 'banmanager-icon.png')
  const iconBuffer = await fs.readFile(iconPath)
  return `data:image/png;base64,${iconBuffer.toString('base64')}`
}

// OG Image template using satori's JSX-like object syntax
function createOgTemplate ({ title, subtitle, iconDataUrl }) {
  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px',
        background: 'linear-gradient(135deg, #0b1220 0%, #111827 50%, #0b1220 100%)',
        color: '#ffffff',
        fontFamily: 'Inter'
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                  },
                  children: [
                    {
                      type: 'img',
                      props: {
                        src: iconDataUrl,
                        width: 72,
                        height: 72,
                        style: { borderRadius: '12px' }
                      }
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: '24px',
                          opacity: 0.8,
                          fontWeight: 400
                        },
                        children: 'banmanagement.com'
                      }
                    }
                  ]
                }
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '56px',
                    fontWeight: 600,
                    lineHeight: 1.2,
                    maxWidth: '900px'
                  },
                  children: title
                }
              },
              subtitle
                ? {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: '28px',
                        opacity: 0.85,
                        maxWidth: '800px',
                        lineHeight: 1.4
                      },
                      children: subtitle
                    }
                  }
                : null
            ].filter(Boolean)
          }
        },
        {
          type: 'div',
          props: {
            style: {
              fontSize: '20px',
              opacity: 0.6
            },
            children: 'Minecraft server moderation tools'
          }
        }
      ]
    }
  }
}

async function renderPng ({ title, subtitle, iconDataUrl, fonts }) {
  const template = createOgTemplate({ title, subtitle, iconDataUrl })

  const svg = await satori(template, {
    width: 1200,
    height: 630,
    fonts
  })

  return sharp(Buffer.from(svg)).png().toBuffer()
}

async function writeOg (relativeOutPath, spec, shared) {
  const fullOutPath = path.join(outRoot, relativeOutPath)
  await fs.mkdir(path.dirname(fullOutPath), { recursive: true })
  const png = await renderPng({ ...spec, ...shared })
  await fs.writeFile(fullOutPath, png)
  console.log(`  ✓ ${relativeOutPath}`)
}

async function main () {
  console.log('Generating OG images...\n')

  // Fetch fonts
  console.log('Fetching Inter fonts from Google Fonts...')
  const [fontRegular, fontSemibold] = await Promise.all([
    fetchFont(400),
    fetchFont(600)
  ])

  const fonts = [
    { name: 'Inter', data: fontRegular, weight: 400, style: 'normal' },
    { name: 'Inter', data: fontSemibold, weight: 600, style: 'normal' }
  ]

  // Load icon
  const iconDataUrl = await loadIcon()

  const shared = { fonts, iconDataUrl }

  console.log('\nGenerating images:')

  // Generate default OG image
  await writeOg('default.png', {
    title: 'Ban Management',
    subtitle: 'BanManager documentation, downloads, and Web UI'
  }, shared)

  // Generate curated set for key pages
  await writeOg('home.png', {
    title: 'Ban Management',
    subtitle: 'A suite of Minecraft plugins for server owners to manage their community with ease'
  }, shared)

  await writeOg('docs.png', {
    title: 'Documentation',
    subtitle: 'Guides, configuration, and API reference for BanManager'
  }, shared)

  await writeOg('download-banmanager.png', {
    title: 'Download BanManager',
    subtitle: 'Core punishment management plugin for Bukkit, BungeeCord, Fabric, Sponge, and Velocity'
  }, shared)

  await writeOg('download-webui.png', {
    title: 'Download Web UI',
    subtitle: 'Browser dashboard for managing punishments, appeals, and player history'
  }, shared)

  await writeOg('download-webenhancer.png', {
    title: 'Download WebEnhancer',
    subtitle: 'Required plugin for Web UI integration with BanManager'
  }, shared)

  await writeOg('support.png', {
    title: 'Support',
    subtitle: 'Get help from the community on Discord or GitHub'
  }, shared)

  console.log('\nOG images generated successfully!')
}

main().catch(err => {
  console.error('Error generating OG images:', err)
  process.exit(1)
})
