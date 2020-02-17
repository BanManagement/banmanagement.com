import { Container, Divider, Header, List, Segment } from 'semantic-ui-react'
import fetch from 'isomorphic-unfetch'
import absoluteUrl from 'next-absolute-url'
import DefaultLayout from '../components/DefaultLayout'
import SyntaxHighlighter from '../components/SyntaxHighlighter'
import { getInitialProps } from '../utils'

const repo = `<repositories>
  <repository>
    <id>confuser-repo</id>
    <url>https://ci.frostcast.net/plugin/repository/everything</url>
  </repository>
</repositories>`
const code = {
  events: {
    bukkit: `public class BanListener implements Listener {

  @EventHandler
  public void notifyOnBan(PlayerBannedEvent event) {
    PlayerBanData ban = event.getBan();

    if (!event.isSilent()) {
      Bukkit.broadcast(ban.getPlayer().getName() + " has been banned!");
    }
  }
}`,
    sponge: `public class BanListener {

  @Listener(order = Order.POST)
  public void notifyOnBan(PlayerBannedEvent event) {
    PlayerBanData ban = event.getBan();

    if (!event.isSilent()) {
      Sponge.getServer().getConsole().sendMessage(Text.of(ban.getPlayer().getName() + " has been banned!"));
    }
  }
}`
  }
}

function dependency (artifact, version) {
  return `<dependencies>
  <dependency>
    <groupId>me.confuser</groupId>
    <artifactId>${artifact}</artifactId>
    <version>${version}</version>
    <scope>provided</scope>
  </dependency>
</dependencies>`
}

async function getProps (initialProps) {
  const { origin } = absoluteUrl(initialProps.req)
  const props = await getInitialProps(initialProps)
  const response = await fetch(`${origin}/api/developer-stats`)
  const data = await response.json()

  return { ...props, ...data }
}

function Page ({ events, isMobileFromSSR, versions }) {
  return (
    <DefaultLayout title='Developers' isMobileFromSSR={isMobileFromSSR}>
      <Segment vertical>
        <Container text>
          <Header as='h1'>Developers</Header>
          <p>Instructions on integrating with BanManager</p>

          <Header as='h2'>Dependency</Header>
          <p>To make use of BanManager's API, simply add the relevant build as a Maven dependency to your project. For access to <code>BmAPI</code> only, please use <code>BanManagerCommon</code>. For anything else, use the server implementation specific build.</p>
          <SyntaxHighlighter language='xml'>{repo}</SyntaxHighlighter>

          <Header as='h3'>BanManagerCommon</Header>
          <SyntaxHighlighter language='xml'>{dependency('BanManagerCommon', versions.bukkit)}</SyntaxHighlighter>

          <Header as='h3'>Bukkit</Header>
          <SyntaxHighlighter language='xml'>{dependency('BanManagerBukkit', versions.bukkit)}</SyntaxHighlighter>

          <Header as='h3'>Sponge</Header>
          <SyntaxHighlighter language='xml'>{dependency('BanManagerSponge', versions.sponge)}</SyntaxHighlighter>

          <Divider horizontal>-</Divider>

          <Header as='h2'>API</Header>

          <Header as='h3'>BmAPI</Header>
          <p>This is a static API class for BanManager to create and manipulate punishments</p>
          <p>Caveats:</p>
          <List bulleted>
            <List.Item>No methods are thread safe unless stated otherwise</List.Item>
            <List.Item>The API does not check permissions for exemptions</List.Item>
          </List>
          <p>A list of methods is available at the <a href='https://javadocs.banmanagement.com/me/confuser/banmanager/common/api/BmAPI.html'>javadocs</a></p>

          <Header as='h3'>Events</Header>
          <p>This provides a way to listen to punishments triggered which contain data about the event itself such as reason, actor (who caused the event) and the player or ip it affects</p>
          <p>A server specific build is required to access these, e.g. BanManagerBukkit</p>
          <p>Events which are in the present tense can be cancelled, e.g. PlayerMuteEvent, whereas events in the past tense cannot e.g. PlayerMutedEvent</p>
          <p>These events are used internally by BanManager</p>
          <p>The following events are supported:</p>
          <List bulleted>
            {events.map(event => <List.Item key={event}>{event}</List.Item>)}
          </List>

          <Header as='h4'>Examples</Header>

          <Header as='h5'>Bukkit</Header>
          <SyntaxHighlighter language='java'>{code.events.bukkit}</SyntaxHighlighter>
          <Header as='h5'>Sponge</Header>
          <SyntaxHighlighter language='java'>{code.events.sponge}</SyntaxHighlighter>
        </Container>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getProps

export default Page
