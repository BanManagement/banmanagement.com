import { Container, Divider, Header, List, Segment } from 'semantic-ui-react'
import DefaultLayout from '../../components/DefaultLayout'
import SyntaxHighlighter from '../../components/SyntaxHighlighter'
import ConfigList from '../../components/ConfigList'
import { getInitialProps } from '../../utils'

// Code examples as JSX does not preserve newlines
const code = {
  localDatabase: `databases:
  # Local Database is always required. If not enabled, plugin will disable on startup.
  local:
    enabled: true
    storageType: 'mysql'
    host: 127.0.0.1
    port: 3306
    name: local_bans
    user: root
    password: ''
    maxConnections: 10
    useSSL: false
    verifyServerCertificate: false  `,
  discord: `enabled: true
punishments:
  ban:
    channel: global
    message: '&6[player] has been permanently banned by [actor] for &4[reason]'
  tempban:
    channel: global
    message: '&6[player] has been temporarily banned for [expires] by [actor] for
      &4[reason]'
  mute:
    channel: global
    message: '&6[player] has been permanently muted by [actor] for &4[reason]'
  tempmute:
    channel: global
    message: '&6[player] has been temporarily muted for [expires] by [actor] for &4[reason]'
  warning:
    channel: global
    message: '&6[player] has been warned by [actor] for &4[reason]'`,
  exemptions: `b55249d4-9226-4c11-9877-d757c3fe180f:
  ban: true
  tempban: true
  mute: true
  tempmute: true
  warn: true
  tempwarn: true
  alts: true
ae51c849-3f2a-4a37-986d-55ed5b02307f:
  ban: true
  tempban: true
  mute: true
  tempmute: true
  warn: true
  tempwarn: true
  alts: true`,
  geoip: `enabled: true
download:
  city: 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=[licenseKey]&suffix=tar.gz'
  country: 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-Country&license_key=[licenseKey]&suffix=tar.gz'
  lastUpdated: 0
  licenseKey: 'yourLicenseKeyHere'
countries:
  type: 'whitelist'
  list:
  - GB
  - FR`,
  reasons: `hacking: "Using a hacked client"
swearing: "Swearing in chat"`,
  schedules: `scheduler:
  expiresCheck: 30
  playerBans: 30
  playerMutes: 30
  playerWarnings: 30
  ipBans: 30
  ipRangeBans: 30
  rollbacks: 30
  nameBans: 30
  externalPlayerBans: 120
  externalPlayerMutes: 120
  externalPlayerNotes: 120
  externalIpBans: 120
  saveLastChecked: 60`,
  warningActions: `actions:
  '10':
  - cmd: ban [player] [reason]
    delay: 10
  - cmd: mute [player] [reason]`,
  hooks: `events:
  ban:
    pre:
    - cmd: kick [player] [reason]
      delay: 10
    - cmd: banip [player] [reason]
    post:
    - cmd: broadcast [player] banned`
}
const configs = {
  config: {
    mutedCommandBlacklist: 'Muted players will be blocked from using commands within this list. Command aliases will automatically be found and blocked, e.g. msg will block tell. Do not prefix commands here with /',
    softMutedCommandBlacklist: 'Similar to mutedCommandBlacklist, but only affects players who are soft muted',
    duplicateIpCheck: 'Displays a warning to those with bm.notify.duplicateips permission if joining players have the same ip as a banned player',
    bypassDuplicateChecks: 'A list of IPs to exclude from the banned player duplicate check',
    logKicks: 'Whether to log /kick to the database',
    logIps: 'Log join/leave history of players, if disabled only the most recent ip address will be stored',
    displayNotifications: 'Broadcasts punishment events to those with bm.notify.X permissions',
    broadcastOnSync: 'Broadcasts a message when new punishments are synced between the database and Minecraft server',
    timeLimits: 'Creates a custom permission to limit the length a player can punish another player for. Once configured, assign the player with the appropriate permission e.g. bm.timelimit.X.Y where X is the punishment type and Y is the custom name you have provided.',
    reportCooldown: 'To prevent duplicate reports you can set a cooldown to limit the amount in seconds before a player can be reported again. Set to 0 to disable.',
    warningCooldown: 'To prevent duplicate warnings you can set a cooldown to limit the amount in seconds before a player can be warned again. Set to 0 to disable.',
    warningActions: {
      enabled: 'Execute a list of commands against a player when they reach a warning point threshold. By default, a single warning is worth 1 point. Use the -p flag when warning a player to change this, e.g. /warn confuser -p 5 Hacking.',
      actions: <>A list of commands to execute when a player reaches a certain number of warning points. For example, the following will mute a player immediately and ban a player after 10 seconds:<SyntaxHighlighter language='yml'>{code.warningActions}</SyntaxHighlighter></>
    },
    warningMute: 'Forces players to type the reason of their most recent warning before being allowed to speak in chat again. Removed on server restart or when player leaves.',
    hooks: {
      enabled: 'This allows running commands before and after punishments',
      events:
  <>The following types are supported:
    <List bulleted>
      <List.Item>ban</List.Item>
      <List.Item>tempban</List.Item>
      <List.Item>unban</List.Item>
      <List.Item>mute</List.Item>
      <List.Item>tempmute</List.Item>
      <List.Item>unmute</List.Item>
      <List.Item>warn</List.Item>
      <List.Item>tempwarn</List.Item>
      <List.Item>ipban</List.Item>
      <List.Item>tempipban</List.Item>
      <List.Item>unbanip</List.Item>
      <List.Item>iprangeban</List.Item>
    </List>
    A list of commands to execute either before or after a particular punishment. For example, the following will ip ban a player immediately and kick them after 10 seconds before the ban applies; after the player is banned a message will be broadcasted:<SyntaxHighlighter language='yml'>{code.hooks}</SyntaxHighlighter>
  </>
    },
    checkForUpdates: 'Checks for new versions of the plugin',
    offlineAutoComplete: 'Includes players who are offline when using tab to autocomplete command arguments',
    punishAlts: 'Automatically apply the same punishments to alts on join based on ip address. This is disabled by default as this could block siblings or those on shared networks.',
    denyAlts: 'Automatically deny players from joining that have the same ip address as a banned player',
    cleanUp: {
      kicks: 'Number of days to keep a player\'s previous kicks, set to 0 to disable',
      banRecords: 'Number of days to keep a player\'s previous bans, set to 0 to disable',
      ipBanRecords: 'Number of days to keep an ip\'s previous bans, set to 0 to disable',
      ipMuteRecords: 'Number of days to keep an ip\'s previous mutes, set to 0 to disable',
      muteRecords: 'Number of days to keep a player\'s previous mutes, set to 0 to disable',
      readWarnings: 'Number of days to keep record of warnings which have been read, set to 0 to disable',
      unreadWarnings: 'Number of days to keep unread warnings for, set to 0 to disable',
      playerHistory: 'Number of days to keep player join/leave records for, set to 0 to disable. Only purges ip addresses that are not actively banned.'
    },
    maxOnlinePerIp: 'Maximum amount of players allowed from a single ip, set to 0 to disable',
    maxMultiaccountsRecently: 'Maximum amount of players allowed from a single ip (recently logged in), set to 0 to disable. The time interval to check is set within multiaccountsTime.',
    multiaccountsTime: 'Time interval to look up for recently joined players (in seconds)',
    checkOnJoin: 'Whether to check the database to see if the player is banned on join or not. Recommended to be disabled, the schedule sync tasks should suffice. If after modifying the schedules.yml syncing is not quick enough, enable this option',
    createNoteReasons: <>Enables creation of notes based on text in between ( ). E.g. <code>/ban confuser testing (too good)</code> will ban for 'testing' and create a note 'too good'</>,
    onlineMode: 'Disable for name case sensitive UUIDs instead of online UUIDs. If you are using a proxy in online mode such as bungeecord, set this to true',
    chatPriority:
  <>Change if muted messages are still showing. The following options are supported:
    <List bulleted>
      <List.Item>lowest</List.Item>
      <List.Item>low</List.Item>
      <List.Item>normal</List.Item>
      <List.Item>high</List.Item>
      <List.Item>highest</List.Item>
      <List.Item>monitor</List.Item>
    </List>
  </>
  },
  console: {
    name: 'This is used to identify the server when it issues punishments via the console',
    uuid: 'This is automatically generated and must not be changed. When syncing multiple servers ensure you allow the plugin to generate this file from scratch, do not copy it.'
  },
  discord: {
    enabled: 'Set to true to enable discord integration',
    punishments: {
      ban: {
        channel: 'The name of the Discord channel (not id) specified in your DiscordSRV config.yml file',
        message: 'Supports Discord Markdown, use \n to represent a new line'
      },
      tempban: {
        channel: 'The name of the Discord channel (not id) specified in your DiscordSRV config.yml file',
        message: 'Supports Discord Markdown, use \n to represent a new line'
      },
      mute: {
        channel: 'The name of the Discord channel (not id) specified in your DiscordSRV config.yml file',
        message: 'Supports Discord Markdown, use \n to represent a new line'
      },
      tempmute: {
        channel: 'The name of the Discord channel (not id) specified in your DiscordSRV config.yml file',
        message: 'Supports Discord Markdown, use \n to represent a new line'
      },
      warning: {
        channel: 'The name of the Discord channel (not id) specified in your DiscordSRV config.yml file',
        message: 'Supports Discord Markdown, use \n to represent a new line'
      }
    }
  },
  exemptions: {
    playerUUID: {
      ban: 'Set to true to exempt this player from being banned',
      tempban: 'Set to true to exempt this player from being temporarily banned',
      mute: 'Set to true to exempt this player from being muted',
      tempmute: 'Set to true to exempt this player from being temporarily muted',
      warn: 'Set to true to exempt this player from being warned',
      tempwarn: 'Set to true to exempt this player from being temporarily warned',
      alts: 'Set to true to exempt this player from showing in alt detections, e.g. /alts and /bminfo'
    }
  },
  geoip: {
    enabled: 'Set to true to enable geoip functionality',
    download: {
      city: 'URL of a Maxmind DB format city data dump',
      country: 'URL of Maxmind DB format country data dump',
      lastUpdated: 'A timestamp of when the local Maxmind database copies were last updated. BanManager will automatically download a new copy every week on plugin startup.'
    },
    countries: {
      type: 'Either blacklist or whitelist. Players connecting from these countries will be denied or allowed to join',
      list: <a href='https://www.iso.org/obp/ui/#search'>A list of ISO formatted country codes</a>
    }
  },
  reasons: {
    shortcut: 'The key should be what you would like to use as a shortcut and the value should be the punishment reason'
  },
  schedules: {
    scheduler: {
      expiresCheck: 'The number of seconds the server will check for expired punishments',
      playerBans: 'The number of seconds the server will check for for player bans changes',
      playerMutes: 'The number of seconds the server will check for player mutes changes',
      playerWarnings: 'The number of seconds the server will check for player warnings changes',
      ipBans: 'The number of seconds the server will check for ip bans changes',
      ipRangeBans: 'The number of seconds the server will check for ip range changes bans',
      rollbacks: 'The number of seconds the server will check for /bmrollback uses',
      nameBans: 'The number of seconds the server will check for name bans changes',
      externalPlayerBans: 'The number of seconds the server will check for global player ban changes',
      externalPlayerMutes: 'The number of seconds the server will check for global player mute changes',
      externalPlayerNotes: 'The number of seconds the server will check for global player note changes',
      externalIpBans: 'The number of seconds the server will check for global player ip changes',
      saveLastChecked: 'The number of seconds the server will update lastChecked values in this file'
    },
    lastChecked: 'These values represent the timestamp of when the server last checked for data changes, you should not change these values'
  }
}

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='Setup Minecraft Plugin' isMobileFromSSR={isMobileFromSSR}>
      <Segment vertical>
        <Container text>
          <Header as='h1'>Setup Minecraft Plugin</Header>
          <p>A full guide for installing, configuring and running BanManager for use in production on a Minecraft Server</p>
          <Header as='h2'>Prerequisites</Header>
          <p>The recommended installation requires the following stack:</p>
          <List bulleted>
            <List.Item><a href='https://www.spigotmc.org/wiki/buildtools/'>Bukkit</a> or <a href='https://www.spongepowered.org/downloads/'>Sponge</a></List.Item>
            <List.Item>MySQL or MariaDB</List.Item>
            <List.Item>Java 8+</List.Item>
          </List>
          <Divider horizontal>-</Divider>

          <Header as='h2'>Initial Setup</Header>
          <List ordered>
            <List.Item>Download BanManager for <a href='https://dev.bukkit.org/projects/ban-management/files'>Bukkit</a> or <a href='https://ore.spongepowered.org/confuser/BanManager/versions'>Sponge</a></List.Item>
            <List.Item>Shut down your minecraft server if running</List.Item>
            <List.Item>Copy downloaded BanManager jar file to /plugins directory or /mods directory depending on server implementation</List.Item>
            <List.Item>Start Minecraft server. After startup this will generate the configuration .yml files in <code>/plugins/BanManager</code> or <code>/mods/BanManager</code></List.Item>
          </List>
          <Divider horizontal>-</Divider>

          <Header as='h2'>Configuration</Header>
          <p>In order to enable and use BanManager it must first be configured</p>

          <Header as='h3'>Default Quick Start</Header>
          <p>Edit <code>/BanManager/config.yml</code> to enable the plugin for usage</p>
          <SyntaxHighlighter language='yml'>{code.localDatabase}</SyntaxHighlighter>
          <List bulleted>
            <List.Item>Ensure <code>enabled</code> is set to true</List.Item>
            <List.Item>If using MariaDB change <code>storageType</code> from <code>mysql</code> to <code>mariadb</code></List.Item>
            <List.Item>Change connection details to match that of your database</List.Item>
            <List.Item>Restart server and check logs to confirm plugin enabled</List.Item>
          </List>
          <p>Please see <a href='/faq#startup-issues'>FAQ</a> for common database connection issues</p>

          <Header as='h3'>config.yml</Header>
          <ConfigList options={configs.config} />

          <Header as='h3'>console.yml</Header>
          <p>You should only change the name value in this file</p>
          <ConfigList options={configs.console} />

          <Header as='h3'>discord.yml</Header>
          <p>Allows sending messages to Discord server channels when a punishment occurs. Supports Bukkit only and requires <a href='https://www.spigotmc.org/resources/discordsrv.18494/'>DiscordSRV</a> plugin.</p>
          <Header as='h4'>Example</Header>
          <SyntaxHighlighter language='yml'>{code.discord}</SyntaxHighlighter>
          <ConfigList options={configs.discord} />

          <Header as='h3'>exemptions.yml</Header>
          <p>Players listed here are exempt from certain punishments even when offline. This is required as Bukkit's permission system does not support offline players.</p>
          <Header as='h4'>Example</Header>
          <SyntaxHighlighter language='yml'>{code.exemptions}</SyntaxHighlighter>
          <ConfigList options={configs.exemptions} />

          <Header as='h3'>geoip.yml</Header>
          <p>Enables location based information, such as showing which country a player is connected from on join or via /bminfo and allows/blocks certain countries from connecting</p>
          <p>Please note this now requires a license key from MaxMind. Please follow <a href='https://essentialsx.cf/wiki/GeoIP.html'>these instructions</a> to generate a license key to paste into <code>licenseKey</code> within your <code>BanManager/geoip.yml</code> </p>
          <Header as='h4'>Example</Header>
          <SyntaxHighlighter language='yml'>{code.geoip}</SyntaxHighlighter>
          <ConfigList options={configs.geoip} />

          <Header as='h3'>messages.yml</Header>
          <p>This contains all of the plugin messages sent to players. Format as desired. Text wrapped inside [] are tokens which will be replaced e.g. <code>[reason]</code> and can be removed if necessary. Use <code>\n</code> for new lines. Supports colours using &amp; format, e.g. <code>&amp;c</code>. Set a message to an empty string if you do not want it to be sent.</p>

          <Header as='h3'>reasons.yml</Header>
          <p>Setup shortcuts for reasons to punish players quickly. Use the below examples like <code>/ban confuser #hacking</code> which will ban the player for the reason <code>Using a hacked client</code>.</p>
          <p>You can combine multiple shortcuts or append/prepend them to reasons, e.g. <code>/ban confuser #hacking &amp; #swearing</code> will ban the player for <code>Using a hacked client &amp; Swearing in chat</code></p>
          <Header as='h4'>Example</Header>
          <SyntaxHighlighter language='yml'>{code.reasons}</SyntaxHighlighter>
          <ConfigList options={configs.reasons} />

          <Header as='h3'>schedules.yml</Header>
          <p>Controls how often data is synced between the database and Minecraft server to punish players across multiple servers. If you are updating punishments directly via the database, ensure you update the timestamps of the relevant punishments to correctly sync back to the Minecraft server.</p>
          <Header as='h4'>Example</Header>
          <SyntaxHighlighter language='yml'>{code.schedules}</SyntaxHighlighter>
          <ConfigList options={configs.schedules} />

          <Divider horizontal>-</Divider>

          <Header as='h2'>Multiple Server Support</Header>
          <p>BanManager supports sharing punishments across multiple servers, often refered to as data syncing in the documentation. This is not dependent on a particular proxy e.g. Bungeecord or Lilypad and there are a number of ways you can achieve this.</p>
          <p>Check out the <a href='/setup'>Cross-Server Syncing Guides</a> for more information.</p>
        </Container>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
