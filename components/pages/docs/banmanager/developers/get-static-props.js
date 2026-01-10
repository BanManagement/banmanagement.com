async function getLatestRelease (_type) {
  const res = await fetch('https://raw.githubusercontent.com/BanManagement/BanManager/refs/heads/master/gradle.properties')
  const text = await res.text()
  const versionMatch = text.match(/version=(.*)/)
  const latest = versionMatch ? versionMatch[1] : null

  return latest
}

async function getEvents () {
  const res = await fetch('https://api.github.com/repos/BanManagement/BanManager/contents/bukkit/src/main/java/me/confuser/banmanager/bukkit/api/events')
  const json = await res.json()
  let events = []

  if (Array.isArray(json)) {
    events = json.map(a => a.name.replace('.java', '')).filter(a => !(a.includes('Custom') || a.includes('Silent')))
  }

  return events
}

export async function getStaticProps () {
  const versions = {
    bukkit: await getLatestRelease('BanManagerBukkit'),
    bungeecord: await getLatestRelease('BanManagerBungeeCord'),
    common: await getLatestRelease('BanManagerCommon'),
    fabric: await getLatestRelease('BanManagerCommon'),
    sponge: await getLatestRelease('BanManagerSponge')
  }

  versions.velocity = versions.bungeecord

  return {
    props: {
      versions,
      events: await getEvents()
    },
    revalidate: 86400 // Cache for a day
  }
}
