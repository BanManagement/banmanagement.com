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
 * Handles versioned platforms like Sponge7, Fabric 1.21.1, etc.
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

    // Match download links on any line
    // Handles both formats:
    // - [Download Fabric1211](url) - compact format
    // - [Download Fabric 1.21.1](url) - readable format
    const match = line.match(/\[Download ([a-zA-Z]+)\s*([\d.]*)\]\(([^)]+)\)/)
    if (match) {
      const platform = match[1].toLowerCase()
      // Convert version to key format: "1.21.1" -> "1211", "7" -> "7", "" -> ""
      const version = match[2] ? match[2].replace(/\./g, '') : ''
      const key = version ? `${platform}${version}` : platform
      downloadUrls[key] = match[3]
    }
  }

  return { changelog, downloadUrls }
}
