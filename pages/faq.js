import { Container, Header, Segment } from 'semantic-ui-react'
import DefaultLayout from '../components/DefaultLayout'
import { getInitialProps } from '../utils'

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='FAQ' isMobileFromSSR={isMobileFromSSR}>
      <Segment vertical>
        <Container text>
          <Header as='h1'>FAQ</Header>

          <Header as='h2' id='startup-issues'>Startup Issues</Header>
          <Header as='h4'>Q: BanManager is showing as red in /plugins</Header>
          <p>Please ensure you have configured the plugin correctly and check either your server log or console for more information</p>
          <Header as='h4'>Q: When trying to /ban a player it displays /ban {'<player> <reason>'}</Header>

          <p>The plugin is not enabled, please check your server startup log for more information</p>
          <Header as='h4'>java.sql.SQLSyntaxErrorException: Table 'bm_players' doesn't exist</Header>
          <p>This occurs when the wrong JDBC driver is in use. If you are using MariaDB, ensure <code>storageType</code> is set to <code>mariadb</code>.</p>

          <Header as='h2' id='sync'>Cross-Server Sync</Header>
          <Header as='h4'>Q: I punished a player but it doesn't appear to have synced across all servers</Header>
          <p>Each server polls for data changes including new punishments. Open your <code>schedules.yml</code> file and check your timings. By default local punishments are checked every 30 seconds and global punishments every 2 minutes. Checking more frequently will increase database usage. If this is insufficient, enable <code>checkOnJoin</code> in your config.yml; this will check the database for new punishments when a player joins each server.</p>
        </Container>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
