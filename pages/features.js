import { Grid, Header, Image, List, Segment } from 'semantic-ui-react'
import DefaultLayout from '../components/DefaultLayout'
import { getInitialProps } from '../utils'

const features = [
  'Fully UUID compliant',
  'Supports H2, MariaDB & MySQL databases',
  'Player bans',
  'Player mutes including soft/shadow muting',
  'Player name bans',
  'Player reporting system',
  'IP and IP range bans & mutes',
  'Succinct permissions',
  'Integrate punishments with other plugins using the hooks system',
  'Warnings support, including a points based system for executing actions when a player reaches each level',
  'Customisable messages with variable support, including custom ban and kick screens',
  'Supports Bukkit, BungeeCord and Sponge servers',
  'Synchronise punishments between servers',
  'Free!'
]
const featureComp = features.map(feature => <List.Item key={feature}><List.Icon name='checkmark' /><List.Content>{feature}</List.Content></List.Item>)

function Page ({ isMobileFromSSR }) {
  return (
    <DefaultLayout title='Features' isMobileFromSSR={isMobileFromSSR}>
      <Segment style={{ paddingTop: '2em', clear: 'both' }} vertical>
        <Grid container stackable verticalAlign='middle' divided='vertically'>
          <Grid.Row>
            <Grid.Column>
              <Header as='h1'>Features</Header>
              <Header as='h2'>Minecraft Plugin</Header>
              <List>
                {featureComp}
              </List>
              <p>For a full list of supported features check the <a href='/setup/minecraft-server#config'>plugin configuration</a> options and <a href='/setup/commands-permissions'>commands</a>.</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h2'>WebUI Features</Header>
              <Header>Open Source</Header>
              <Header.Content>Released under an MIT licence. Contributions welcome!</Header.Content>
              <Header>Accounts System</Header>
              <Header.Content>Seamless logins via a unique pin generated in-game, no complex registration forms.</Header.Content>
              <Header>Manage Players</Header>
              <Header.Content>Create custom roles with fine grained permissions to control what they can see and edit.</Header.Content>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image bordered rounded size='large' src='/images/feature-roles.png' alt='Manage player roles preview' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column floated='left' width={6}>
              <Image bordered rounded size='large' src='/images/feature-layouts.png' alt='Manage page layouts preview' />
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
