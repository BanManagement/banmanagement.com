/**
 * Fetches the latest release from a GitHub repository
 * @param {string} repo - Repository in format "owner/repo"
 * @returns {Promise<object|null>} Release data or null if failed
 */
export async function fetchLatestRelease (repo) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/releases/latest`
    )

    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

/**
 * Parses a GitHub release body to extract changelog and download URLs
 * Handles versioned platforms like Sponge7, Fabric1211, etc.
 * @param {string} body - Release body markdown
 * @returns {{ changelog: string[], downloadUrls: Record<string, string> }}
 */
export function parseReleaseBody (body) {
  const changelog = []
  const downloadUrls = {}

  if (!body) return { changelog, downloadUrls }

  for (const line of body.split(/\r?\n/)) {
    if (line.startsWith('- ')) {
      changelog.push(line.slice(2))
    }

    // Match download links on any line (not just ### headers)
    // Handles: [Download Sponge7](url), [Download Fabric1211](url), etc.
    const match = line.match(/\[Download ([a-zA-Z]+)(\d*)\]\(([^)]+)\)/)
    if (match) {
      const key = match[2]
        ? `${match[1].toLowerCase()}${match[2]}`
        : match[1].toLowerCase()
      downloadUrls[key] = match[3]
    }
  }

  return { changelog, downloadUrls }
}
