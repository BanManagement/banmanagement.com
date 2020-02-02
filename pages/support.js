import { Container, Header, Segment } from 'semantic-ui-react'
import DefaultLayout from '../components/DefaultLayout'
import { getInitialProps } from '../utils'

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='Support' isMobileFromSSR={isMobileFromSSR}>
      <Segment vertical>
        <Container text>
          <Header as='h1'>Support</Header>
          <p>Checkout the <a href='/faq'>FAQ</a> page for the most commonly asked questions</p>

          <Header as='h2'>Join Discord</Header>
          <p>Having trouble setting something up? Have questions? <a href='https://discord.gg/59bsgZB'>Join the Discord server</a></p>

          <Header as='h2'>Discuss on GitHub</Header>
          <p>Found a bug, or want to request a new feature? You can join the discussion on <a href='https://github.com/BanManagement/BanManager/issues'>GitHub</a></p>
        </Container>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
