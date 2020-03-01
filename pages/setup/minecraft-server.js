import { Container, Divider, Header, List, Segment } from 'semantic-ui-react'
import DefaultLayout from '../../components/DefaultLayout'
import SyntaxHighlighter from '../../components/SyntaxHighlighter'
import ConfigList from '../../components/ConfigList'
import { getInitialProps } from '../../utils'
import { configs, code } from '../../data/configs'

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

          <Header as='h3' id='config'>config.yml</Header>
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
