import { Container, Divider, Header, Segment } from 'semantic-ui-react'
import DefaultLayout from '../../../components/DefaultLayout'
import { getInitialProps } from '../../../utils'

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='Migrate from H2' isMobileFromSSR={isMobileFromSSR}>
      <Segment vertical>
        <Container text>
          <Header as='h1'>Migrate from H2</Header>
          <p>A full guide for migrating from H2 to MySQL or MariaDB. This will import all data.</p>
          <Header as='h2'>Prerequisites</Header>
          <p>The recommended installation requires BanManager to be setup on your Minecraft server</p>
          <Divider horizontal>-</Divider>

          <Header as='h2'>Migration</Header>
          <p>Shutdown the server and update configuration details to connect to your new MariaDB/MySQL database; the table names must remain the same as H2 and the new database must not contain any existing BanManager data.</p>
          <p>Start the server and run the following command either in-game or via your Minecraft server console:</p>
          <p><code>/bmimport h2 {'<fileName>'}</code></p>
          <p>Replace the command arguments with your H2 file name which is local to the BanManager configuration directory, e.g.</p>
          <p><code>/bmimport h2 local_bans</code></p>
          <p>BanManager will begin importing data. You will be sent a message once completed.</p>
          <p>Check the Minecraft server console for any potential issues with the import.</p>
          <p>It is recommended you restart your server once import has completed to ensure all punishments work correctly.</p>
        </Container>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
