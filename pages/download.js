import PropTypes from 'prop-types'
import Link from 'next/link'
import { Layout } from 'components/layout'
import { DownloadCard } from 'components/pages/download/download-card'
import { DEMO } from 'constants/urls'
import { PageHeader } from 'components/page-header'
import { FaCog, FaDesktop } from 'react-icons/fa'
import { formatDistanceToNowStrict } from 'date-fns'

const DownloadSection = ({ title, subTitle, children }) => (
  <div className="pt-12 bg-white">
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900 text-center">
      <h3 className="text-xl font-bold leading-7">
        {title}
      </h3>
      <p className="text-sm">{subTitle}</p>
      {children}
    </div>
  </div>
)

DownloadSection.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  children: PropTypes.node
}

export async function getStaticProps () {
  const res = await fetch('https://api.github.com/repos/BanManagement/BanManager/releases/latest')
  const release = await res.json()

  const changelog = []
  const downloadUrls = {}

  release.body.split('\r\n').forEach(line => {
    if (line.startsWith('-')) {
      changelog.push(line.substring(2))
    } else if (line.startsWith('###')) {
      const [, type, url] = line.match(/\[Download ([a-zA-Z]+)\]\((.*)\)/)

      if (!type) return

      downloadUrls[type.toLowerCase()] = url
    }
  })

  return {
    props: {
      release: {
        version: release.tag_name,
        changelog,
        publishedAt: release.published_at,
        downloadUrls
      }
    },
    revalidate: 3600 // Cache for an hour
  }
}

function DownloadPage ({ release }) {
  return (
    <Layout title="Download" description="Download BanManager for your Minecraft server, supporting Bukkit, Craftbukkit, Spigot, PaperMC, Sponge, BungeeCord and more!">
      <PageHeader>Download</PageHeader>
      <DownloadSection title="BanManager" subTitle="Minecraft plugin">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="p-2 text-center">
            <h4 className="text-xl font-bold leading-7">{release.version}</h4>
            <p className="text-sm">{formatDistanceToNowStrict(new Date(release.publishedAt))} ago</p>
            <ul className="pt-3 list-disc text-left overflow-auto max-h-96 pl-4">
              {release.changelog.map((change, i) => <li key={i}>{change}</li>)}
            </ul>
          </div>
          <div className="lg:col-span-4">
          <div className="grid lg:grid-cols-3">
            <DownloadCard title="Bukkit" description="CraftBukkit/Spigot/Paper etc, 1.7.2+" imgSrc="/images/bukkit-logo.png" stableUrl={release.downloadUrls.bukkit} experimentalUrl="https://ci.frostcast.net/job/BanManager/lastSuccessfulBuild/artifact/bukkit/build/libs/BanManagerBukkit.jar" />
            <DownloadCard title="BungeeCord" description="Latest build" imgSrc="/images/bungeecord-logo.png" stableUrl={release.downloadUrls.bungeecord} experimentalUrl="https://ci.frostcast.net/job/BanManager/lastSuccessfulBuild/artifact/bungee/build/libs/BanManagerBungeeCord.jar" />
            <DownloadCard title="Fabric" description="Latest build" imgSrc="/images/fabric-logo.svg" stableUrl={release.downloadUrls.fabric} experimentalUrl="https://ci.frostcast.net/job/BanManager/lastSuccessfulBuild/artifact/fabric/build/libs/BanManagerFabric.jar" showDisabledDownload />
            <DownloadCard title="Sponge" description="Sponge Forge/Sponge Vanilla API 7+" imgSrc="/images/sponge-logo.svg" stableUrl={release.downloadUrls.sponge} experimentalUrl="https://ci.frostcast.net/job/BanManager/lastSuccessfulBuild/artifact/sponge/build/libs/BanManagerSponge.jar" />
            <DownloadCard title="Velocity" description="Latest build" imgSrc="/images/velocity-logo.svg" stableUrl={release.downloadUrls.velocity} experimentalUrl="https://ci.frostcast.net/job/BanManager/lastSuccessfulBuild/artifact/velocity/build/libs/BanManagerVelocity.jar" showDisabledDownload />
          </div>
          </div>
        </div>
      </DownloadSection>
      <hr className="max-w-7xl mx-auto mt-12" />
      <DownloadSection title="Web UI" subTitle="Manage your data from anywhere">
        <div className="grid grid-cols-1 sm:grid-cols-2 mx-auto pb-12">
          <DownloadCard title="Latest" description="Node.js React/GraphQL based supporting custom roles, layouts and more" imgSrc="/images/react-logo.png" size='md' coverImage>
            <a
              href={DEMO}
              className="py-3 px-4 hover:bg-gray-200 font-bold rounded-lg shadow inline-flex items-center mr-4"
            >
              <FaDesktop className="fill-current w-4 h-4 mr-2" />
              Demo
            </a>
            <Link
              href="/docs/webui/install"
              className="py-3 px-4 text-white bg-primary-500 hover:bg-primary-800 rounded-lg shadow inline-flex items-center ml-4"
            >
              <FaCog className="fill-current w-4 h-4 mr-2" />
              <span>Install</span>
            </Link>
          </DownloadCard>
          <DownloadCard title="Legacy" description="A PHP based UI to manage punishment data" imgSrc="/images/php-logo.svg" size='md'>
            {/* <a
              href={DEMO}
              className="py-3 px-4 hover:bg-gray-200 font-bold rounded-lg shadow inline-flex items-center mr-4"
            >
              <FaDesktop className="fill-current w-4 h-4 mr-2" />
              Demo
            </a> */}
            <a
              href="https://github.com/BanManagement/BanManager-WebUI/tree/legacy#banmanager-webui"
              className="py-3 px-4 text-white bg-primary-500 hover:bg-primary-800 rounded-lg shadow inline-flex items-center ml-4"
            >
              <FaCog className="fill-current w-4 h-4 mr-2" />
              <span>Install</span>
            </a>
          </DownloadCard>
        </div>
      </DownloadSection>
    </Layout>
  )
}

DownloadPage.propTypes = {
  release: PropTypes.object
}

export default DownloadPage
