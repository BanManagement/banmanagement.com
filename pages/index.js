import { Button, Container, Divider, Grid, Header, Icon, Image, Segment } from 'semantic-ui-react'
import DefaultLayout from '../components/DefaultLayout'

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
    <Image src='/static/images/feature-player.png' bordered rounded floated='left' style={{ marginTop: mobile ? '1.5em' : '2.5em' }}/>
  </Container>
)

export default () => <DefaultLayout title='Ban Management' heading={Heading}>
  <Segment style={{ padding: '2em 0em', clear: 'both' }} vertical>
    <Grid container divided stretched stackable centered columns='equal' verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Image src='/static/images/bukkit-logo.png' size='tiny' centered />
          <Header as='h3' style={{ fontSize: '1.5em' }}>BanManager</Header>
          <Header.Content>The original Java Minecraft Bukkit plugin</Header.Content>
          <Header.Content>
            <Button icon='download' as='a' href='https://dev.bukkit.org/projects/ban-management' />
            <Button icon='github' as='a' href='https://github.com/BanManagement/BanManager' />
          </Header.Content>
        </Grid.Column>
        <Grid.Column textAlign='center'>
          <Image src='/static/images/graphql-logo.png' size='tiny' centered />
          <Header as='h3' style={{ fontSize: '1.5em' }}>BanManager-WebAPI</Header>
          <Header.Content>A Node.js GraphQL based API to manage all your data</Header.Content>
          <Header.Content>
            <Button icon='download' as='a' href='https://github.com/BanManagement/BanManager-WebAPI' />
            <Button icon='github' as='a' href='https://github.com/BanManagement/BanManager-WebAPI' />
          </Header.Content>
        </Grid.Column>
        <Grid.Column textAlign='center'>
          <Image src='/static/images/react-logo.png' size='tiny' centered />
          <Header as='h3' style={{ fontSize: '1.5em' }}>BanManager-WebUI</Header>
          <Header.Content>A Node.js React based UI</Header.Content>
          <Header.Content>
            <Button icon='download' as='a' href='https://github.com/BanManagement/BanManager-WebUI' />
            <Button icon='github' as='a' href='https://github.com/BanManagement/BanManager-WebUI' />
          </Header.Content>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
</DefaultLayout>
