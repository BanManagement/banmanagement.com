import PropTypes from 'prop-types'
import { Layout } from 'components/layout'
import Image from 'next/image'
import { GiCrane } from 'react-icons/gi'
import { FaWrench, FaChevronRight, FaHatWizard, FaGlobe } from 'react-icons/fa'
import { Search } from 'components/search'

const styles = {
  image: 'h-32 w-full relative',
  card: 'pt-8 pb-8 rounded overflow-hidden shadow-lg bg-white mx-auto'
}

const MigrationItem = ({ title, icon, href }) => (
  <a href={href} className="text-center">
    <div className={`${styles.card.replace('pt-8', 'pt-4').replace('pb-8', 'pb-4')} h-32`}>
      <div className="px-6">
        <div className="w-11 h-11 mx-auto">{icon}</div>
        <div className="text-sm mt-4">{title}</div>
      </div>
    </div>
  </a>
)

MigrationItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  href: PropTypes.string.isRequired
}

function DocsIndexPage () {
  return (
    <Layout title="Documentation" patternBackground="bg-hero-floating-cogs" description="Get started with BanManager in the official documentation, and learn more about all our features!">
      <div className="bg-primary-900 md:overflow-hidden bg-hero-floating-cogs bg-left-top bg-auto bg-repeat-x h-72">
      </div>
      <div className="-mt-72 pt-16 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
            Documentation
          </h2>
          <div className="relative text-black pt-6">
            <Search />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6">
          <a href="/docs/banmanager/configuration" className="p-2 sm:p-4 text-left">
            <div className={`${styles.card} max-w-sm`}>
              <div className="px-6">
                <FaWrench className="w-11 h-11 text-green-600" />
                <div className="font-bold text-base mt-4">Core Concepts</div>
                <p className="text-gray-700 text-base mt-0 sm:h-16 md:h-12">
                  A detailed view of BanManager&apos;s architecture, commands &amp; configuration
                </p>
                <p className="mt-6 text-green-600">
                  Learn More <FaChevronRight className="inline" />
                </p>
              </div>
            </div>
          </a>
          <a href="/docs/banmanager/install" className="p-2 sm:p-4 text-left">
            <div className={`${styles.card} max-w-sm`}>
              <div className="px-6">
                <GiCrane className="w-11 h-11 text-blue-600" />
                <div className="font-bold text-base mt-4">Install / Setup</div>
                <p className="text-gray-700 text-base mt-0 sm:h-16 md:h-12">
                  Easy guides to setting up BanManager on your Minecraft servers
                </p>
                <p className="mt-6 text-blue-600">
                  Learn More <FaChevronRight className="inline" />
                </p>
              </div>
            </div>
          </a>
          <a href="/docs/banmanager/config-builder" className="p-2 sm:p-4 text-left">
            <div className={`${styles.card} max-w-sm`}>
              <div className="px-6">
                <FaHatWizard className="w-11 h-11 text-purple-600" />
                <div className="font-bold text-base mt-4">Configuration Builder</div>
                <p className="text-gray-700 text-base mt-0 sm:h-16 md:h-12">
                  Quickly determine the version and ideal configuration setup based on your needs
                </p>
                <p className="mt-6 text-purple-600">
                  Learn More <FaChevronRight className="inline" />
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
      <hr className="max-w-8xl mx-auto mt-12" />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-12 md:flex content-center flex-wrap">
          <a href="/docs/webui/install" className="p-4 md:flex md:w-1/2 lg:w-1/3 text-left">
            <div className={`${styles.card} max-w-sm`}>
              <div className="px-6">
                <FaGlobe className="w-11 h-11 text-blue-600" />
                <div className="font-bold text-base mt-4">Latest WebUI</div>
                <p className="text-gray-700 text-base mt-0">
                  Manage punishments, reports and more! Tailor the look to your server and manage access rights all from your mobile or computer.
                </p>
                <p className="mt-6 text-blue-600">
                  Install <FaChevronRight className="inline" />
                </p>
              </div>
            </div>
          </a>
          <div className="md:flex md:w-1/2 lg:w-1/3 py-4 md:p-4">
            <div className="border-1 border-gray-100 rounded-lg shadow-lg">
              <Image src="/images/feature-player.png" alt="WebUI player page" className="rounded-lg" width="1360" height="971" />
            </div>
          </div>
          <div className="md:flex md:w-1/2 lg:w-1/3 py-4 md:p-4">
            <div className="border-1 border-gray-100 rounded-lg shadow-lg">
              <Image src="/images/feature-roles.png" alt="WebUI roles page" className="rounded-lg" width="1360" height="971" />
            </div>
          </div>
        </div>
        <hr className="max-w-8xl mx-auto mt-12" />
        <div className="mt-6 text-left p-4">
          <h3 className="text-xl font-bold">
            Migration guides
          </h3>
          <p>
            Easily migrate data from other punishment systems
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-6">
            <MigrationItem title="Minecraft Java Edition" icon={<Image src="/images/minecraft-seeklogo.svg" alt="Minecraft Logo" width="44" height="44" />} href="/docs/banmanager/migrations/minecraft-java-edition" />
            <MigrationItem title="BanManager H2" icon={<Image src="/images/banmanager-icon.png" alt="BanManager Logo" width="44" height="44" />} href="/docs/banmanager/migrations/h2" />
            <MigrationItem title="AdvancedBan" icon={<Image src="/images/advancedban-icon.png" alt="AdvancedBan Logo" width="44" height="44" />} href="/docs/banmanager/migrations/advancedban" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DocsIndexPage
