import { Container, Divider, Header, Segment, List } from 'semantic-ui-react'
import DefaultLayout from '../../../components/DefaultLayout'
import { getInitialProps } from '../../../utils'

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='Sync Setup - All' isMobileFromSSR={isMobileFromSSR}>
      <Segment vertical>
        <Container text>
          <Header as='h1'>Share punishments across all servers</Header>
          <p>BanManager supports sharing punishments across multiple servers, often refered to as data syncing in the documentation. This is not dependent on a particular proxy e.g. Bungeecord or Lilypad and there are a number of ways you can achieve this.</p>
          <p>This guide explains how to enforce punishments as if it were a single server. Bans, mutes and all other punishment information will be shared and synchronised. E.g. if a player is banned on one server, they are banned from all servers.</p>
          <Header as='h2'>Prerequisites</Header>
          <p>This requires BanManager to be setup on each Minecraft server.</p>
          <Divider horizontal>-</Divider>

          <Header as='h2'>Guide</Header>
          <List ordered>
            <List.Item>Enable <code>database.local</code> on all servers.</List.Item>
            <List.Item>Configure each server to use the same database and tables in the local settings.</List.Item>
            <List.Item>Ensure each <code>console.yml</code> has a unique name and uuid value. If not, delete the file and let BanManager recreate it on start up, this will generate a unique UUID.</List.Item>
            <List.Item>Open <code>schedules.yml</code> and change the default sync timings from 30 seconds to an appropriate value of your choosing. This determines how quickly data is synced between servers.</List.Item>
            <List.Item>Restart each server for the new configuration to apply</List.Item>
          </List>

          <Divider horizontal>-</Divider>

          <Header as='h3'>Tips</Header>
          <List bulleted>
            <List.Item>If the sync is too slow, enable <code>checkOnJoin</code> within your config.yml file. This will force BanManager to check for new punishments when a player joins the server.</List.Item>
            <List.Item>Enable <code>broadcastOnSync</code> to broadcast punishment notifications across all servers.</List.Item>
          </List>
        </Container>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
