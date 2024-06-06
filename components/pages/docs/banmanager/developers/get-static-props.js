import semverRsort from 'semver/functions/rsort'

async function getLatestRelease (type) {
  const res = await fetch('https://ci.frostcast.net/plugin/repository/everything/me/confuser/banmanager/' + type + '/')
  const text = await res.text()
  const versions = [...text.matchAll(/<A href='.*?'>(.*?)<\/A>/g)].map(a => a[1])
  const latest = semverRsort(versions)[0]

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
    sponge: await getLatestRelease('BanManagerSponge')
  }

  versions.velocity = versions.bungeecord

  return {
    props: {
      versions,
      events: await getEvents()
    },
    revalidate: 3600 // Cache for an hour
  }
}
