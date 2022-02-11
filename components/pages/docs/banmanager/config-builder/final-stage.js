import PropTypes from 'prop-types'
import { FaDownload } from 'react-icons/fa'
import { load, dump } from 'js-yaml'
import { Code } from 'components/code'

const downloadUrls = {
  BungeeCord: 'https://ci.frostcast.net/job/BanManager/lastSuccessfulBuild/artifact/bungee/build/libs/BanManagerBungeeCord.jar',
  Sponge: 'https://ore.spongepowered.org/confuser/BanManager/versions',
  'CraftBukkit/Spigot/Paper': 'https://dev.bukkit.org/projects/ban-management/files/latest'
}

export const FinalStage = ({ currentState, configYaml }) => {
  const config = load(configYaml)
  const serverType = currentState.context.serverType || currentState.context.networkType
  const downloadUrl = downloadUrls[serverType]

  // Set config values
  config.databases.local.storageType = currentState.context.storageType.toLowerCase()
  config.databases.local.host = currentState.context.host
  config.databases.local.port = currentState.context.port
  config.databases.local.user = currentState.context.user
  config.databases.local.password = currentState.context.password
  config.databases.local.name = currentState.context.name

  const configOutput = dump(config)

  return (
    <>
      <h2 className="text-xl leading-7 sm:text-xl mb-4">You need BanManager for {serverType}</h2>
      <a
        href={downloadUrl}
        className="block py-3 px-4 text-white bg-primary-500 hover:bg-primary-800 rounded-lg shadow inline-flex items-center"
      >
        <FaDownload className="fill-current w-4 h-4 mr-2" />
        <span>Download</span>
      </a>
      <p className="pt-6 text-left">
        <strong>Recommended config.yml</strong>
      </p>
      <Code language='yaml'>
        {configOutput}
      </Code>
    </>
  )
}

FinalStage.propTypes = {
  currentState: PropTypes.object.isRequired,
  configYaml: PropTypes.string
}
