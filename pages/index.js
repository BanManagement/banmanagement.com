import React from 'react'
import { Button, Container, Grid, Header, Image, Segment } from 'semantic-ui-react'
import DefaultLayout from '../components/DefaultLayout'
import { getInitialProps } from '../utils'

const Heading = ({ mobile }) => (
  <Container text>
    <Header
      as='h2'
      content='Ban Management'
      inverted
      style={{
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em'
      }}
    />
    <Header
      as='h3'
      content='An Open Source suite for Minecraft Server owners to manage player punishments'
      inverted
      style={{
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em'
      }}
    />
    <Button primary size='huge' as='a' href='/features'>
      Learn More
    </Button>
    <Image src='/images/feature-player.png' alt='Player page preview' bordered rounded floated='left' style={{ marginTop: mobile ? '1.5em' : '2.5em' }} />
  </Container>
)

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='Home' heading={Heading} isMobileFromSSR={isMobileFromSSR} description='A suite of Minecraft plugins such as BanManager for server owners to manage punishments with ease, supporting Bukkit, BungeeCord and Sponge'>
      <Segment style={{ padding: '2em 0em', clear: 'both' }} vertical>
        <Grid container stretched stackable centered columns='equal' verticalAlign='bottom'>
          <Grid.Row>
            <Header as='h2'>
              BanManager
              <Header.Subheader>
                The core plugin for popular platforms offering a <a href='/features'>variety of features</a>
              </Header.Subheader>
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <a href='https://dev.bukkit.org/projects/ban-management'>
                <Image src='/images/bukkit-logo.png' size='tiny' centered alt='Bukkit Logo' />
                <Header as='h3' style={{ fontSize: '1.5em' }}>Bukkit</Header>
              </a>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <a href='https://ci.frostcast.net/job/BanManager'>
                <Image src='/images/bungeecord-logo.png' size='small' centered alt='BungeeCord Logo' />
                <Header as='h3' style={{ fontSize: '1.5em' }}>BungeeCord</Header>
              </a>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <a href='https://ore.spongepowered.org/confuser/BanManager'>
                <Image src='/images/sponge-logo.svg' size='tiny' centered alt='Sponge Logo' />
                <Header as='h3' style={{ fontSize: '1.5em' }}>Sponge</Header>
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: '2em 0em', clear: 'both' }} vertical>
        <Grid container stretched stackable centered columns='equal' verticalAlign='bottom'>
          <Grid.Row>
            <Header as='h2'>
              Web Applications
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Image src='/images/react-logo.png' size='tiny' centered alt='React Logo' />
              <Header as='h3' style={{ fontSize: '1.5em' }}>Web UI</Header>
              <Header.Content>A Node.js React/GraphQL based UI</Header.Content>
              <Header.Content style={{ marginTop: '1em' }}>
                <Button size='big' icon='download' as='a' href='https://github.com/BanManagement/BanManager-WebUI' aria-label='Download BanManager-WebUI' />
                <Button size='big' icon='github' as='a' href='https://github.com/BanManagement/BanManager-WebUI' aria-label='View BanManager-WebUI Source' />
              </Header.Content>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Image src='/images/php-logo.svg' size='tiny' centered alt='PHP Logo' />
              <Header as='h3' style={{ fontSize: '1.5em' }}>Legacy Web UI</Header>
              <Header.Content>A PHP based UI to display punishment data</Header.Content>
              <Header.Content style={{ marginTop: '1em' }}>
                <Button size='big' icon='download' as='a' href='https://github.com/BanManagement/BanManager-WebUI/archive/legacy.zip' aria-label='Download Legacy BanManager-WebUI' />
                <Button size='big' icon='github' as='a' href='https://github.com/BanManagement/BanManager-WebUI/tree/legacy' aria-label='View Legacy BanManagerWebAPI Source' />
              </Header.Content>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
