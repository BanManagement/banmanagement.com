import { Button, Container, Grid, Header, Image, Segment } from 'semantic-ui-react'
import DefaultLayout from '../components/DefaultLayout'
import { getInitialProps } from '../utils'

const Heading = ({ mobile }) => (
  <Container text>
    <Header
      as='h2'
      content='Modern server administration technology'
      inverted
      style={{
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em'
      }}
    />
    <Header
      as='h3'
      content='A powerful suite for Minecraft Server owners to manage players with ease'
      inverted
      style={{
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em'
      }}
    />
    <Button primary size='huge' as='a' href='/setup'>
      Get Started
    </Button>
    <Image src='/static/images/feature-player.png' bordered rounded floated='left' style={{ marginTop: mobile ? '1.5em' : '2.5em' }} />
  </Container>
)

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='Features' heading={Heading} isMobileFromSSR={isMobileFromSSR}>
      <Segment style={{ paddingTop: '2em', clear: 'both' }} vertical>
        <Grid container stackable verticalAlign='middle' divided='vertically'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header>Open Source</Header>
              <Header.Content>Released under an MIT licence. Contributions welcome!</Header.Content>
              <Header>Accounts System</Header>
              <Header.Content>Seamless logins via a unique pin generated in-game, no complex registration forms.</Header.Content>
              <Header>Manage Players</Header>
              <Header.Content>Create custom roles with fine grained permissions to control what they can see and edit.</Header.Content>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image bordered rounded size='large' src='/static/images/feature-roles.png' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column floated='left' width={6}>
              <Image bordered rounded size='large' src='/static/images/feature-layouts.png' />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header>Page Layouts</Header>
              <Header.Content>Customise each inbuilt page to look and feel how you like for each device (Desktop, Tablet, Phone).</Header.Content>
              <Header>Centralised</Header>
              <Header.Content>Oversee bans and other data for every server from one area, with ease.</Header.Content>
              <Header>Manage Reports</Header>
              <Header.Content>View, comment and resolve reports all from the web.</Header.Content>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
