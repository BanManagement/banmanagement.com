import { Container, Divider, Header, Segment, List } from 'semantic-ui-react'
import DefaultLayout from '../../../components/DefaultLayout'
import { getInitialProps } from '../../../utils'

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='Sync Setup - Individual' isMobileFromSSR={isMobileFromSSR}>
      <Segment vertical>
        <Container text>
          <Header as='h1'>Individual punishments across servers</Header>
          <p>BanManager supports sharing punishments across multiple servers, often refered to as data syncing in the documentation. This is not dependent on a particular proxy e.g. Bungeecord or Lilypad and there are a number of ways you can achieve this.</p>
          <p>This guide explains how to setup multiple servers with individual punishments per server and the ability to issue punishments across all servers. E.g. a player banned on one server is not banned on others; however, you still have the ability to issue a ban across all servers should you wish.</p>
          <Header as='h2'>Prerequisites</Header>
          <p>This requires BanManager to be setup on each Minecraft server.</p>
          <Divider horizontal>-</Divider>

          <Header as='h2'>Guide</Header>
          <List ordered>
            <List.Item>Enable <code>database.local</code> on all servers.</List.Item>
            <List.Item>Configure each server to use a <strong>different</strong> database or different tables in the local settings.</List.Item>
            <List.Item>Enable <code>database.global</code> on all servers, configure each server to use the <strong>same</strong> global database and tables.</List.Item>
            <List.Item>Ensure each <code>console.yml</code> has a unique name and uuid value. If not, delete the file and let BanManager recreate it on start up, this will generate a unique UUID.</List.Item>
            <List.Item>Open <code>schedules.yml</code> and change the default sync timings from 2 minutes (120 seconds) to an appropriate value of your choosing. This determines how quickly global punishments are applied between servers.</List.Item>
            <List.Item>Restart each server for the new configuration to apply.</List.Item>
            <List.Item>Commands such as <code>/banall</code> should now be available to issue global punishments.</List.Item>
          </List>
        </Container>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
