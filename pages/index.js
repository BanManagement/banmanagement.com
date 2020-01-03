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
      content='A powerful suite for Minecraft Server owners to manage players with ease'
      inverted
      style={{
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em'
      }}
    />
    <Button primary size='huge' as='a' href='/features'>
      Learn More
    </Button>
    <Image src='/static/images/feature-player.png' alt='Player page preview' bordered rounded floated='left' style={{ marginTop: mobile ? '1.5em' : '2.5em' }} />
  </Container>
)

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='Ban Management' heading={Heading} isMobileFromSSR={isMobileFromSSR}>
      <Segment style={{ padding: '2em 0em', clear: 'both' }} vertical>
        <Grid container divided stretched stackable centered columns='equal' verticalAlign='middle'>
          <Grid.Row>
            <Header>Server Plugins</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Image src='/static/images/bukkit-logo.png' size='tiny' centered alt='Bukkit Logo' />
              <Header as='h3' style={{ fontSize: '1.5em' }}>Bukkit</Header>
              <Header.Content style={{ marginTop: '1em' }}>
                <Button size='big' icon='download' as='a' href='https://dev.bukkit.org/projects/ban-management' aria-label='Download BanManager' />
                <Button size='big' icon='github' as='a' href='https://github.com/BanManagement/BanManager' aria-label='View BanManager Source' />
              </Header.Content>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Image src='/static/images/sponge-logo.svg' size='tiny' centered alt='Sponge Logo' />
              <Header as='h3' style={{ fontSize: '1.5em' }}>Sponge</Header>
              <Header.Content style={{ marginTop: '1em' }}>
                <Button size='big' icon='download' as='a' href='https://ore.spongepowered.org/confuser/BanManager' aria-label='Download BanManager' />
                <Button size='big' icon='github' as='a' href='https://github.com/BanManagement/BanManager' aria-label='View BanManager Source' />
              </Header.Content>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Header>Web Applications</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Image src='/static/images/graphql-logo.png' size='tiny' centered alt='GraphQL Logo' />
              <Header as='h3' style={{ fontSize: '1.5em' }}>BanManager-WebAPI</Header>
              <Header.Content>A Node.js GraphQL based API to manage all your data</Header.Content>
              <Header.Content style={{ marginTop: '1em' }}>
                <Button size='big' icon='download' as='a' href='https://github.com/BanManagement/BanManager-WebAPI' aria-label='Download BanManager-WebAPI' />
                <Button size='big' icon='github' as='a' href='https://github.com/BanManagement/BanManager-WebAPI' aria-label='View BanManagerWebAPI Source' />
              </Header.Content>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Image src='/static/images/react-logo.png' size='tiny' centered alt='React Logo' />
              <Header as='h3' style={{ fontSize: '1.5em' }}>BanManager-WebUI</Header>
              <Header.Content>A Node.js React based UI</Header.Content>
              <Header.Content style={{ marginTop: '1em' }}>
                <Button size='big' icon='download' as='a' href='https://github.com/BanManagement/BanManager-WebUI' aria-label='Download BanManager-WebUI' />
                <Button size='big' icon='github' as='a' href='https://github.com/BanManagement/BanManager-WebUI' aria-label='View BanManager-WebUI Source' />
              </Header.Content>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </DefaultLayout>)
}

Page.getInitialProps = getInitialProps

export default Page
