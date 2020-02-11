import { Container, Divider, Header, Segment } from 'semantic-ui-react'
import DefaultLayout from '../../../components/DefaultLayout'
import { getInitialProps } from '../../../utils'

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='Migrate from Vanilla Minecraft' isMobileFromSSR={isMobileFromSSR}>
      <Segment vertical>
        <Container text>
          <Header as='h1'>Migrate from Vanilla Minecraft</Header>
          <p>A full guide for migrating from Minecraft's inbuilt banning system to BanManager. This will import bans and ip bans.</p>
          <Header as='h2'>Prerequisites</Header>
          <p>The recommended installation requires BanManager to be setup on your Minecraft server</p>
          <Divider horizontal>-</Divider>

          <Header as='h2'>Migration</Header>
          <p>Run the following command either in-game or via your Minecraft server console:</p>
          <p><code>/bmimport players</code></p>
          <p>BanManager will begin importing ban data. You will be sent a message once completed.</p>
          <p>Check the Minecraft server console for any potential issues with the import.</p>
          <p>To import ip bans, follow the same steps but use the following command:</p>
          <p><code>/bmimport ips</code></p>
        </Container>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
