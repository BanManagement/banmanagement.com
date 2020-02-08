import { Container, Divider, Header, Segment } from 'semantic-ui-react'
import DefaultLayout from '../../../components/DefaultLayout'
import { getInitialProps } from '../../../utils'

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='Migrate from AdvancedBan' isMobileFromSSR={isMobileFromSSR}>
      <Segment vertical>
        <Container text>
          <Header as='h1'>Migrate from AdvancedBan</Header>
          <p>A full guide for migrating from AdvancedBan to BanManager. This will import bans, ip bans, mutes and warnings.</p>
          <Header as='h2'>Prerequisites</Header>
          <p>The recommended installation requires BanManager to be setup on your Minecraft server</p>
          <Divider horizontal>-</Divider>

          <Header as='h2'>Migration</Header>
          <p>Run the following command either in-game or via your Minecraft server console:</p>
          <p><code>/bmimport advancedban 127.0.0.1 3306 databaseName username password</code></p>
          <p>Replace the command arguments with your database connection details for AdvancedBan, e.g.</p>
          <p><code>/bmimport advancedban 127.0.0.1 3006 banmanager survival mypass</code></p>
          <p>BanManager will begin importing data from AdvancedBan. You will be sent a message once completed.</p>
          <p>Check the Minecraft server console for any potential issues with the import</p>
        </Container>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
