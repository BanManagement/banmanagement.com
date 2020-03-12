import React from 'react'
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react'

export default function Footer ({ isMobileFromSSR }) {
  const yearNow = new Date().getFullYear()

  return (
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a' href='https://dev.bukkit.org/projects/ban-management'>BanManager Bukkit Plugin</List.Item>
                <List.Item as='a' href='https://ore.spongepowered.org/confuser/BanManager'>BanManager Sponge Plugin</List.Item>
                <List.Item as='a' href='https://ci.frostcast.net/job/BanManager/lastSuccessfulBuild/artifact/bungee/target/BanManagerBungeeCord.jar'>BanMaanger BungeeCord Plugin</List.Item>
                <List.Item as='a' href='https://discord.gg/59bsgZB'>Request Support</List.Item>
                <List.Item as='a' href='https://github.com/BanManagement/banmanagement.com'>Site Source</List.Item>
                <List.Item as='a' href='https://github.com/BanManagement/banmanagement.com/issues'>Report Site Issues</List.Item>
              </List>
            </Grid.Column>
            {/* <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column> */}
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                BanManagement
              </Header>
              <p>
                James Mortemore &copy; 2012 - {yearNow}
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
}
