import memoize from 'memoizee'
import fetch from 'isomorphic-unfetch'
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
  const events = json.map(a => a.name.replace('.java', '')).filter(a => !(a.includes('Custom') || a.includes('Silent')))

  return events
}

const getLatestCachedRelease = memoize(getLatestRelease, { length: 1, promise: true, maxAge: 36000, preFetch: true, primitive: true })
const getCachedEvents = memoize(getEvents, { promise: true, maxAge: 36000, preFetch: true, primitive: true })

export default async (req, res) => {
  const data = {
    versions: {
      bukkit: await getLatestCachedRelease('BanManagerBukkit'),
      sponge: await getLatestCachedRelease('BanManagerSponge')
    },
    events: await getCachedEvents()
  }

  res.status(200).json(data)
}
